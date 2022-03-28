"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cart_Items", {
      cartItemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      cartId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Carts",
          key: "cartId",
        },
      },
      foodId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Food",
          key: "foodId",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cart_Items");
  },
};
