import { DataTypes } from "sequelize";
import sequelize from "../db";

const Vendor = sequelize.define(
  "Vendors",
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
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      },
    },
    openTime: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    closeTime: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    deliveryFee: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
 
  },
  { timestamps: true }
);
// Vendor.hasMany("Menus", {as: "menus"})
export default Vendor;
