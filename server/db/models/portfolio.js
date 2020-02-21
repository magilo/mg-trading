const Sequelize = require('sequelize')
const db = require('../db')

//holds quantity of each stock inside users portfolio

const Portfolio = db.define('portfolio', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: '0',
    validate: {
      min: 0
    }
  }
})

module.exports = Portfolio
