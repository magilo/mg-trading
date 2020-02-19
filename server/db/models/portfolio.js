// const Sequelize = require('sequelize')
// const db = require('../db')

// //holds each stock as a row

// const Portfolio = db.define('portfolio', {
//   symbol: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   qty: {
//     type: Sequelize.INTEGER,
//   },
//   price: {
//     type: Sequelize.INTEGER,
//     validate: {
//       min: 0
//     },
//     get() {
//       return this.getDataValue('price') / 100
//     }
//   }
// })

// module.exports = Portfolio
