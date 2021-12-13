const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {   // Do we need the date created property if timestamps is set to TRUE?
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        client_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
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
        modelName: 'project',
    }
);

module.exports = Project;