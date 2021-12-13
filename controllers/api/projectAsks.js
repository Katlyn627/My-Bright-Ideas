const router = require('express').Router();
const req = require('express/lib/request');
const ProjectAsks = require('../../models/ProjectAsks');
const withAuth = require('../../utils/auths');


// GET route that shows all projects asks
router.get('/ProjectAsks/:id', async (req, res) => {
  try {
    const askData = await ProjectAsks.findByPk(req.params.id);
    if (!askData) {
      res.status(404).json({ message: 'No project asks found!' });
      return;
    }
    res.status(200).json(askData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST route to create a projectAsks route to the tasks column
router.post('/', withAuth, async (req, res) => {
  console.log("We made it here to the POST route!");
  try {
    console.log('------------------------------',
    req.session.project_id);
    const askData = await ProjectAsks.create({
      ...req.body,
      project_id: req.session.project_id,
    });

    res.status(200).json(askData.dataValues);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// UPDATE a project ask
router.put('/ProjectAsks/:id', async (req, res) => {
  try {
    const userData = await ProjectAsks.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No project asks found!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Router to delete an Ask based on its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const projectAskData = await ProjectAsks.destroy({
          where: {
              id: req.params.id,
              project_id: req.session.project_id,
          },
      });

      if (!projectAskData) {
          res.status(404).json({ message: 'No project ask found with this id!' });
          return;
      }

      res.status(200).json(projectAskData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Exporting the router
module.exports = router;