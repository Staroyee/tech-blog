const sequelize = require('../config/connection');
const { User, Article, Comment } = require('../models');

const userData = require('./userData.json');
const articleData = require('./articleData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const article of articleData) {
    await Article.create({
      ...article,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
