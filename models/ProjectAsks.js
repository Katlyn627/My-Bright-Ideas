const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProjectAsks extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    };
};

ProjectAsks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
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
    modelName: 'project_asks',
  }
);

module.exports = ProjectAsks;