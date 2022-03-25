'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Items.belongsTo(models.Order, {foreignKey: "orderId"})
      Order_Items.belongsTo(models.Food, {foreignKey: "foodId", as: "food"})
    }
  }
  Order_Items.init({
    orderItemId: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    foodId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Order_Items',
  });
  return Order_Items;
};