// Requiring all Models to establish relationships below
const User = require('./User');
const Tasks = require('./Tasks');
const Comment = require('./Comment');
const ProjectAsks = require('./ProjectAsks');
const Project = require('./Project');


// Model Relationships

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true
});

Project.belongsTo(User, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
});

Project.hasMany(Comment, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
});

Comment.belongsTo(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
})

ProjectAsks.belongsTo(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
});

Project.hasMany(ProjectAsks, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
});

Tasks.belongsTo(Project, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
});

Project.hasMany(Tasks, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE',
    hooks: true
});


// Exporting
module.exports = { User, Tasks, Comment, ProjectAsks, Project };