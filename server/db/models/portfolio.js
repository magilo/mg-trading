const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    get() {
      return this.getDataValue('price') / 100
    }
  }
})

module.exports = Portfolio
