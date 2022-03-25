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
      // Order.belongsTo(models.User, {foreignKey: "userId"})
      Order.belongsTo(models.Vendor, {foreignKey: "vendorId", as: "vendor"})
      Order.hasMany(models.Order_Items, { foreignKey: "orderId", as: "orderItems"})
      
    }
  }
  Order.init({
 
    orderId: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
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