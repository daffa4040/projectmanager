const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  Team.associate = (models) => {
    Team.hasMany(models.Project, { as: 'projects' });
  };

  return Team;
};
