const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Initializing the Comment Model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'project',
                key: 'id',
            },
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;