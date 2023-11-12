module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Projects', 'TeamId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Projects', 'TeamId');
  },
};