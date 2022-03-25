"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Vendor.hasMany(models.Order, {foreignKey: "vendorId", as: "vendor"})
    }
  }
  Vendor.init(
    {
      vendorId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },
      openTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      closeTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      deliveryFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true, sequelize, modelName: "Vendor" }
  );
  return Vendor;
};
