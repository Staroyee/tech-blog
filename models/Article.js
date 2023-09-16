const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Article extends Model {}

Article.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        article_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        article_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'article',
    }
);

module.exports = Article;