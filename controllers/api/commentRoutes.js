const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auths');


// GET route that shows all comments
router.get('/Comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a comment route to the comments column

router.post('/', withAuth, async (req, res) => {
  console.log('----------WE MADE IT TO THE COMMENT POST ROUTE------------');
  try {
    console.log('-----------------------', req.session.project_id, '------------------');
    const commentData = await Comment.create({
      ...req.body,
      project_id: req.session.project_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE a project ask
router.put('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Router to delete a comment based on its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const commentData = await Comment.destroy({
          where: {
              id: req.params.id,
              project_id: req.session.project_id,
          },
      });

      if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
      }

      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});


// Exporting the router
module.exports = router;