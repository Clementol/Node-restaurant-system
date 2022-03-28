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
      validate: {
        customValidator(value) {
          if (value !== "PENDING" || value !== "PAID") {
            throw new Error("either be [PENDING|PAID] ");
          }
        }
      }
    },
    paymentMethod: {
      type: DataTypes.ENUM("CARD", "CASH", ""),
      defaultValue: "",
      validate: {
        customValidator(value) {
          if (value !== "CARD" || value !== "CASH" || value !== "") {
            throw new Error("either be [CARD|CASH|'']");
          }
        }
      }
    },
    orderStatus: {
      type: DataTypes.ENUM("ORDERED", "COMING", "DELIVERED"),
      defaultValue: "ORDERED",
      validate: {
        isIn: {
          args: [["ORDERED", "COMING", "DELIVERED"]],
          msg: "either be [ORDERED|COMING|DELIVERED]"
        },
        // customValidator(value) {
        //   console.log(value)
        //   if (value != "ORDERED" || value != "COMING" || value != "DELIVERED") {
        //     throw new Error("either be [ORDERED|COMING|DELIVERED] ");
        //   }
        // }
      }
    },
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Order',
  });
  return Order;
};