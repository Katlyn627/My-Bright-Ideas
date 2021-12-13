const { Tasks } = require('../models');

const tasksData = [
    {
        task_content: 'Compare donuts',
        project_id: 1
    },
    {
        task_content: 'Find locations',
        project_id: 1
    },
    {
        task_content: 'Take selfie',
        project_id: 1
    },
    {
        task_content: 'Example 2',
        project_id: 2
    },
    {
        task_content: 'Example 3',
        project_id: 2
    },
    {
        task_content: 'Example 4',
        project_id: 2
    },
    {
        task_content: 'Example 5',
        project_id: 2
    }
];

const seedTasks = () => Tasks.bulkCreate(tasksData);

module.exports = seedTasks;