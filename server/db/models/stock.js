const Sequelize = require('sequelize')
const db = require('../db')

//holds each stock as a row
const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

// const Stock = db.define('stock', {
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
// })

module.exports = Stock
