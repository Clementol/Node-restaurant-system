"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Food, {foreignKey: "menuId", as: "foods"})
    }
  }
  Menu.init(
    {
      menuId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vendorId: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //   model: "Vendors",
        //   key: "vendorId",
        // },
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
