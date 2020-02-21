const User = require('./user')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')
const Stock = require('./stock')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//make portfolio from transactions
Transaction.belongsTo(User)
User.hasMany(Transaction)

Stock.belongsToMany(User, {through: Portfolio})
User.belongsToMany(Stock, {through: Portfolio})
// User.hasMany(Stock, { through: Portfolio })
// Cart.belongsToMany(Treehouse, {through: TreehouseCart})
// Stock.belongsTo(User)

// Portfolio.belongsTo(User)
// User.hasOne(Portfolio)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Transaction,
  Portfolio,
  Stock
}
