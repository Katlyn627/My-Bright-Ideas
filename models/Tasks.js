const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Tasks extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    };
};

Tasks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    task_content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      refereces: {
        model: 'project',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tasks',
  }
);

module.exports = Tasks;