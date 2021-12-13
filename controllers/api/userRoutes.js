const router = require('express').Router();
const { User } = require('../../models');


// POST route to create a new user (right??)
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            console.log(userData);

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// Router to login a user based on previously saved userData
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again! '});
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res 
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});


// POST router to signup new user. (Do we need this?)
router.post('/signup', async (req, res) => {
    try {
        console.log('req.body', req.body); //Seems to creating the user with name, email, and password
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// Router to logout a user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


// Exporting the router
module.exports = router;