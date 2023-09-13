const router = require('express').Router();
const { User, Article, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.get('/', (req, res) => {
  Article.findAll({
    attributes: ['id', 'body', 'article_title'],
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'article_id', 'user_id'],
        include: {
          model: User,
          attributes: ['user_name'],
        },
      },
    ],
  })
    .then((dbArticleData) => res.json(dbArticleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'body', 'article_title'],
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'article_id', 'user_id'],
        include: {
          model: User,
          attributes: ['user_name'],
        },
      },
    ],
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No article found with this id' });
        return;
      }
      res.json(dbArticleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Article.create({
    article_title: req.body.article_title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
    .then((dbArticleData) => res.json(dbArticleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Article.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No article found with this id' });
        return;
      }
      res.json(dbArticleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Article.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No article found with this id' });
        return;
      }
      res.json(dbArticleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
