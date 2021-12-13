const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auths');

// RESTful -> routes represent operations around an entity / resource
// In this our case, the resource is "projects"
// - create
// - list (index)
// - update 
// - delete

// // TODO: GET route that shows all projects. Is that redundant here?
// router.get("/projects", async (req, res) => {
//   try {

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET a project using its ID
router.get('/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);
    if (!projectData) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new project
router.post('/', withAuth, async (req, res) => {
console.log("We made it here to the POST route");
  try {
    const projectData = await Project.create({
      ...req.body,
      date_created: new Date().getTime(),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      user_id: req.session.user_id
    });

    if(!projectData) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }

    res.status(200).json(projectData.dataValues);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});




// UPDATE a project using its ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!projectData[0]) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// In real world, the best practice is not NEVER delete your data (aka always keep a history)
// you can still define your DELETE route on a project
// but instead of doing Project.destroy (which will literally delete that row from your db)
// you can something like update an attribute on the model, e.g. project.deleted = true; or project.deleted_at = <timestamp>; or project.inactive = true
// then, for your LIST route (GET all), you filter out only the active projects, e.g. SELECT * FROM projects where DELETED is null


// DELETE a project using ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    
    if (!projectData) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Exporting the router
module.exports = router;