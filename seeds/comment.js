const { Comment, Project } = require('../models');
// Created seeds for comments

const commentData = [
    {
        comment: 'First Proeject Started',
        user_id: 2,
        project_id: 1,
    },
    {
        comment: 'Project is in Progress',
        user_id: 2,
        project_id: 1,
    },
    {
        comment: 'Making Notes on Status of Project',
        user_id: 3,
        project_id: 1,
    },
    {
        comment: 'Commenting on Notes',
        user_id: 3,
        project_id: 2,
    },
    {
        comment: 'comment 2.3',
        user_id: 1,
        project_id: 2,
    },
    {
        comment: 'comment 2.4',
        user_id: 1,
        project_id: 2,
    },
    {
        comment: 'comment 3.1',
        user_id: 1,
        project_id: 3,
    },
    {
        comment: 'comment 3.2',
        user_id: 2,
        project_id: 3,
    },
    {
        comment: 'comment 3.4',
        user_id: 3,
        project_id: 3,
    },
    {
        comment: 'comment 4.1',
        user_id: 1,
        project_id: 4,
    },
    {
        comment: 'comment 4.2',
        user_id: 2,
        project_id: 4,
    },
    {
        comment: 'comment 4.3',
        user_id: 3,
        project_id: 4,
    },
]

const commentSeed = () => Comment.bulkCreate(commentData);

module.exports = commentSeed;
// 