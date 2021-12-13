const router = require('express').Router();
const { Tasks } = require('../../models');
const withAuth = require('../../utils/auths');

// Router to create a Task
router.post('/', withAuth, async (req, res) => {
    console.log('------------WE MADE IT TO THE POST ROUTE!!!!!---------------');
    try {
        console.log('------------------',
        req.session.project_id,
        '---------------------');
        const newTask = await Tasks.create({
            ...req.body,
            project_id: req.session.project_id,
        });
        console.log('------------',newTask.dataValues,'----------------');
        res.status(200).json(newTask.dataValues);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Router to edit a Task based on its ID
router.put('/edit/:id', withAuth, async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    try {
        const dbTaskData = await Tasks.update({
            name: req.body.name,
            task_content: req.body.task_content,
            stage: req.body.stage
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

    res.status(200).json(dbTaskData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Router to delete a task based on its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Tasks.destroy({
            where: {
                id: req.params.id,
                project_id: req.session.project_id,
            },
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found with this id!' });
            return;
        }

        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Exporting the router
module.exports = router;