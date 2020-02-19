const Sequelize = require('sequelize')
const db = require('../db')

//each transaction is a row

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  qty: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    get() {
      return this.getDataValue('purchasePrice') / 100
    }
  },
  orderDate: {
    type: Sequelize.DATE,
    get() {
      const date = this.getDataValue('orderDate')
      if (date)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      return ''
    }
  }
})

module.exports = Transaction
