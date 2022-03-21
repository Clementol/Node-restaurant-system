'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.changeColumn('Users', "email", {
    //   type: Sequelize.STRING,
    //   unique: true,
    //   allowNull: false,
    // });
    // await queryInterface.changeColumn("Users", "avatar", {
    //   type: Sequelize.STRING,

    //   allowNull: true,
    // })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
  
    // await queryInterface.removeColumn("Users", "token")
    // queryInterface.removeColumn("Users", "refreshToken")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
