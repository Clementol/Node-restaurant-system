'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      // id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "userId"
        }
      },
      vendorId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Vendors",
          key: "vendorId"
        }
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "PENDING"
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      orderStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "ORDERED"
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
    await queryInterface.dropTable('Orders');
    // await queryInterface.addColumn("Orders", "id", {
    //   type: Sequelize.INTEGER,
    //     autoIncrement: true,
    // })

   
  }
};