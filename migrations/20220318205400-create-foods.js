'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Foods', {
      foodId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
      },
      menuId :{
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Menus",
          key: "menuId",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
   
    // await queryInterface.dropTable('Foods');
  }
};