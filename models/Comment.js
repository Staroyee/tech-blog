//COMMENT MODEL - TABLE DEFINITION
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
                len: 1 //Makes sure that there is at least 1 character in the comment.
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "article",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    },
);

module.exports = Comment;