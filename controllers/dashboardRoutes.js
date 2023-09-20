//ROUTES FOR DASHBOARD { GET, POST, PUT, DELETE }
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', withAuth, (req, res) => {
    Article.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'article_body',
        'article_title',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'article_id', 'user_id'],
          include: {
            model: User,
            attributes: ['user_name']
          }
        },
        {
          model: User,
          attributes: ['user_name']
        }
      ]
    })
      .then(dbArticleAata => {
        const articles = dbArticleAata.map(article => article.get({ plain: true }));
        res.render('dashboard', { articles, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/edit/:id', withAuth, (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'article_body',
      'article_title',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'article_id', 'user_id'],
        include: {
          model: User,
          attributes: ['user_name']
        }
      },
      {
        model: User,
        attributes: ['user_name']
      }
    ]
  })
    .then(dbArticleAata => {
      if (!dbArticleAata) {
        res.status(404).json({ message: 'No article found with this id' });
        return;
      }
      const article = dbArticleAata.get({ plain: true });
      res.render('edit-article', { article, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edituser', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      const user = dbUserData.get({ plain: true });
      res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exs = router;
module.exports = router;