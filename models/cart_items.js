'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_Items.init({
    cartItemId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    cartId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    foodId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Cart_Items',
  });
  return Cart_Items;
};