const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
  });

  return Project;
};
