// Requiring the express router
const router = require('express').Router();

// Requring each api route
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectsRoutes');
const projectAskRoutes = require('./projectAsks');
const taskRoutes = require('./taskRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/projectAsks', projectAskRoutes);
router.use('/tasks', taskRoutes);
router.use('/comments', commentRoutes);

module.exports = router;