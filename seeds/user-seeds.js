const { User } = require('../models');

const userData = [
    {
        "name": "Katlyn Boches",
        "email": "katlyn@hotmail.com",
        "password": "password12345"
    },
    {
        "name": "Eric Martin",
        "email": "eric@gmail.com",
        "password": "password12345"
    },
    {
        "name": "Jon Jackson",
        "email": "jon@aol.com",
        "password": "password12345"
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;