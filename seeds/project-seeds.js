const { Project } = require('../models');

const projectData = [
    {
        name: 'E-Commerce Platform',
        date_created: 2021-12-05,
        client_name: "Brad Johnson",
        client_email: "bjohnson@gmail.com",
        client_phone: "4795551234",
        // user_id: 1
    },
    {
        name: 'Commercial Website',
        date_created: 2021-10-03,
        client_name: 'Jack Bellamy',
        client_email: "jbellamy@gmail.com",
        client_phone: "4799876543", 
        // user_id: 2
    },
    {
        name: 'New API',
        date_created: 2021-08-03,
        client_name: "Trevor McCoy",
        client_email: "tmccoy@gmail.com",
        client_phone: "4793759856", 
        // user_id: 3
    },
    {
        name: 'Dog Tracker',
        date_created: 2021-09-08,
        client_name: "Carl Reynolds",
        client_email: "creynolds@gmail.com",
        client_phone: "4795556789", 
        // user_id: 1
    },
    {
        name: 'Tech Blog',
        date_created: 2021-08-28,
        client_name: "Victor Stein",
        client_email: "vstein@gmail.com",
        client_phone: "4795559674", 
        // user_id: 2
    },
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;