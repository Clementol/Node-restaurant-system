// userId: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   primaryKey: true,
// },
// firstName: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     isAlpha: true
//   }
// },
// lastName: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// avatar: {
//   type: DataTypes.STRING,
// },
// email: {
//   type: DataTypes.STRING,
//   unique: true,
//   validate: {
//     isEmail: {
//       msg: "enter valid email"
//     }
//   },
// },
// password: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// phone: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     isNumeric: true
//   }
// },
// token: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// refreshToken: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },


// vendorId: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   primaryKey: true,
// },
// name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// image: {
//   type: DataTypes.STRING,
//   allowNull: false
// },
// location: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// latitude: {
//   type: DataTypes.FLOAT,
//   allowNull: false,
//   validate: {
//     isFloat: true
//   }
// },
// longitude: {
//   type: DataTypes.FLOAT,
//   allowNull: false,
//   validate: {
//     isFloat: true
//   },
// },
// openTime: {
//   type: DataTypes.FLOAT,
//   allowNull: false
// },
// closeTime: {
//   type: DataTypes.FLOAT,
//   allowNull: false
// },
// deliveryFee: {
//   type: DataTypes.INTEGER,
//   allowNull: false
// }


// menuId: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   primaryKey: true,
// },
// name: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: true
// },
// startDate: {
//   type: DataTypes.DATE,
//   allowNull: true,
// },
// endDate: {
//   type: DataTypes.DATE,
//   allowNull: true
// },
// vendorId :{
//   type: DataTypes.STRING,
//   allowNull: false,
//   references: {
//     model: "Vendors",
//     key: "vendorId",
//   }
// },


// foodId: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   primaryKey: true,
// },
// name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// price: {
//   type: DataTypes.FLOAT,
//   allowNull: false
// },
// image: {
//   type: DataTypes.STRING,
// },
// menuId :{
//   type: DataTypes.STRING,
//   allowNull: false,
// },

export const config = {
  JWT_SECRETE: process.env.JWT_SECRET,
  BUCKET: process.env.BUCKET
}

import "dotenv/config"

const DbConfig =  {
  "development": {
    "username": `${process.env.MYSQL_USER}`,
    "password": `${process.env.MYSQL_ROOT_PASSWORD}`,
    "database": `${process.env.MYSQL_DB}`,
    "host": "127.0.0.1",
    "dialect": `${process.env.DIALECT}`,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",

  }
}

module.exports = DbConfig;