const router = require('express').Router();
const { Article, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Article.findAll({
    attributes: ['id', 'article_title', 'article_body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['user_name'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No articles available!' });
        return;
      }
      const articles = dbArticleData.map((article) =>
        article.get({ plain: true })
      );
      res.render('home', { articles, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/article/:id', (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'article_title', 'article_body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['user_name'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['user_name'],
          },
        ],
      },
    ],
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No articles available!' });
        return;
      }
      const article = dbArticleData.get({ plain: true });
      const myArticle = post.user_id == req.session.user_id;
      res.render('one-article', {
        article,
        loggedIn: req.session.loggedIn,
        currentUser: myArticle,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
