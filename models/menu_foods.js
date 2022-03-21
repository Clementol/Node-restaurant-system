import { DataTypes } from "sequelize";
import sequelize from "../db";
import Food from "./food";
import Menu from "./menus";

const Menu_Foods = sequelize.define(
  "Menu_Foods",
  {
    menuId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Menu,
        key: "menuId"
      }
    },
    foodId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Food,
        key: "foodId"
      }
    },
  },
  { timestamps: true }
);

// Menu_Foods.associations = () => {

//   Menu_Foods.belongsTo(Menu, {as: "menu",foreignKey: "menuId"})
//   Menu_Foods.belongsTo(Food, {as: "foods",foreignKey: "foodId"})
// }

export default Menu_Foods;


