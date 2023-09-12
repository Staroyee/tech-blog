const router = require('express').Router();
const { Article, User, Comment } = require('../../models');

router.get('/', (req, res) => {
  Article.findAll({
    attributes: ['id', 'article_title', 'body', 'user_id'],
    include: [
      {
        model: Comment,
        as: 'comment',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbArticleData) => {
      res.json(dbArticleData);
    })
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
    attributes: ['id', 'article_title', 'body', 'user_id'],
    include: [
      {
        model: Comment,
        as: 'comment',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbArticleData) => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No article with this id' });
        return;
      }
      res.json(dbArticleData);
    })
    .then((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Article.create({
        article_title: req.body.article_title,
        body: req.body.body,
        user_id: req.session.user_id,
    })
    .then((dbArticleData) => {
        res.json(dbArticleData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    Article.update(
        {
            article_title: req.body.article_title,
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then((dbArticleData) => {
        if (!dbArticleData) {
            res.status(404).json({ message: 'No article with this id' });
            return;
        }
        res.json(dbArticleData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Article.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbArticleData) => {
        if (!dbArticleData) {
            res.status(404).json({ message: 'No article with this id' });
            return;
        }
        res.json(dbArticleData);
    })
    .catch((err) => {
        console.log(err),
        res.status(500).json(err);
    });
});

module.exports = router;