'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    orderId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("PENDING", "PAID"),
      defaultValue: "PENDING",
    },
    paymentMethod: {
      type: DataTypes.ENUM("CARD", "CASH", ""),
      defaultValue: "",
    },
    orderStatus: {
      type: DataTypes.ENUM("ORDERED", "COMING", "DELIVERED"),
      defaultValue: "ORDERED",
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Order',
  });
  return Order;
};