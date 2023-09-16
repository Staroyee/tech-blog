const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

User.hasMany(Article, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true
});

Article.hasMany(Comment, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE',
    hooks: true
});

Article.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true
});

Comment.belongsTo(Article, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE',
    hooks: true
});


module.exports = {
    User,
    Article,
    Comment,
}