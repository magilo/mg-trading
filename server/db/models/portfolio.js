const Sequelize = require('sequelize')
const db = require('../db')

//holds quantity of each stock inside users portfolio

const Portfolio = db.define('portfolio', {
  qty: {
    type: Sequelize.INTEGER
  }
})
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
// })

module.exports = Portfolio
