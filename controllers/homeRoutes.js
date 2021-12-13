const router = require('express').Router();


// Would we need to call all Models here since Comments, ProjectAsks, and Tasks all live within the project?
// If we are calling the Project model with our GET requests, do we need to call the Models that live within them?
// How does that work in regards to primary keys and foreign keys?

const { Project, User, Comment, ProjectAsks, Tasks } = require('../models');
const withAuth = require('../utils/auths');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // TODO: you want to filter project by user_id
    // where user_id = <id of current signed in user>
    const projectData = await Project.findAll({
      // where: 
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render(req.session.logged_in ? 'profile' : 'login', {
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Router to find projects by ID
// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const projects = await Project.findAll({
      attributes: ['name', 'id'],
      where: {
        user_id: req.session.user_id
      }
    })

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
      projects: projects.map(project => project.dataValues)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', withAuth, async (req, res) => {
  console.log(0, req.params.id);
    try {
      const projectData = await Project.findByPk(req.params.id, {
        include: [
          { model: Comment }, 
          { model: ProjectAsks }, 
          { model: Tasks }
        ],
      })

      const project = projectData.get({ plain: true });
      req.session.save(() => {
        req.session.project_id = req.params.id;
      });
      res.render('project', { project });
    } catch (err) {
      res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

module.exports = router;

