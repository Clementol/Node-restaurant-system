'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // queryInterface.changeColumn("Users", "userId", {
    //   type: Sequelize.STRING,
    //   // defaultValue: Sequelize.UUIDV4,
    // })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
