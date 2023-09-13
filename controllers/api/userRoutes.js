const router = require('express').Router();
const { Article, User, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'user_name', 'email', 'password'],
        include: [
            {
                model: Article,
                as: 'article',
                attributes: ['id', 'article_title', 'body'],
            },
            {
                model: Comment,
                as: 'comment',
                include: ['id', 'comment_text', 'article_id'],
            },
        ],
    })
    .then((dbUserData) => {
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'user_name', 'email', 'password'],
        include: [
            {
                model: Article,
                as: 'article',
                attributes: ['id', 'article_title', 'body'],
            },
            {
                model: Comment,
                as: 'comment',
                attributes: ['id', 'comment_text', 'article_id'],
            },
        ],
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    })
    .then((dbUserData) => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.user_name = dbUserData.user_name;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        const validatePassword = dbUserData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.user_name = dbUserData.user_name;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'Login successful' });
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;