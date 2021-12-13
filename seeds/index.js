const seedComments = require('./comment');
const seedProjects = require('./project-seeds');
const seedProjectAsks = require('./project-asks');
const seedTasks = require('./task');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');
const { response } = require('express');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');
        await seedProjects();
        console.log('\n----- PROJECTS SEEDED -----\n');
        await seedComments();
        console.log('\n----- COMMENTS SEEDED -----\n');
        await seedProjectAsks();
        console.log('\n----- PROJECT ASKS SEEDED -----\n');
        await seedTasks();
        console.log('\n----- TASKS SEEDED -----\n');   
    } catch (err) {
        console.log(err);
    };
    process.exit(0);
};

seedAll();