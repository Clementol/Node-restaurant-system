import { DataTypes } from "sequelize";
import sequelize from "../db";
import Food from "./food";
import Menu_Foods from "./menu_foods";

const Menu = sequelize.define(
  "Menus",
  {
    menuId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vendorId :{
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Vendors",
        key: "vendorId",
      }
    },
  },
  { timestamps: true }
);

Menu.hasMany(Food, {foreignKey: "menuId"})
export default Menu;
