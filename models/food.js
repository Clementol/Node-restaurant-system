import { DataTypes } from "sequelize";
import sequelize from "../db";
import Menu from "./menus";
import Menu_Foods from "./menu_foods";


const Food = sequelize.define(
  "Foods",
  {
    foodId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    },
    menuId :{
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Menu,
        key: "menuId",
      }
    },
  },
  { timestamps: true }
);

Food.belongsTo(Menu, {foreignKey: "menuId"})
export default Food;
