'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn("Menu_Foods", "foodId", {
    //     type: Sequelize.STRING,
    //     allowNull: false,

    // })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeConstraint("Foods","name" )

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
