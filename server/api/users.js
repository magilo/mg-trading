const router = require('express').Router()
const {User, Transaction, Stock, Portfolio} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/balance', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    const balanceOnly = {
      balance: singleUser.balance
    }
    res.json(balanceOnly)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/balance', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    user.balance = req.body.balance * 100
    await user.save()
    // res.json(user)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/transactions', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: [{model: Transaction}]
    })
    res.json(singleUser.transactions)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/transactions', async (req, res, next) => {
  try {
    //create new row on transaction table
    // set the order date
    const now = new Date()
    const transaction = await Transaction.create({
      symbol: req.body.symbol,
      qty: req.body.qty,
      purchasePrice: req.body.purchasePrice,
      orderDate: now
    })
    //associate newly created transaction w/ user
    const singleUser = await User.findByPk(req.params.userId)
    await transaction.setUser(singleUser)

    // const updatePortfolio = await Portfolio.
    res.json(transaction) //update this to send status
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/portfolio', async (req, res, next) => {
  try {
    // const userStocks = await singleUser.getStocks()
    const userStocks = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Stock,
          through: {
            where: {
              // userId is a column present at the junction table
              userId: req.params.userId
            }
          }
        }
      ]
    })
    const userPortfolio = userStocks.stocks
    // console.log('userStocks', userStocks)
    res.json(userPortfolio)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/portfolio', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    // const userStocks = await singleUser.getStocks()
    // console.log('userStocks', userStocks.length)

    const stock = await Stock.findOrCreate({
      where: {
        symbol: req.body.symbol
      }
    })

    await singleUser.addStock(stock[0])

    // const nextuserStocks = await singleUser.getStocks()
    // console.log('nextuserStocks', nextuserStocks.length)

    const selector = {
      where: {
        userId: req.params.userId,
        stockId: stock[0].id
      }
    }

    const currStock = await Portfolio.findOne(selector)
    const currQty = currStock.qty
    let newQty = currQty + parseInt(req.body.qty)
    // console.log('currQty', typeof (currQty))
    // console.log('req.body.qty', typeof (req.body.qty))

    // if (currQty === null) {
    //   newQty = parseInt(req.body.qty)
    // } else {
    //   newQty = currQty + parseInt(req.body.qty)
    // }

    await Portfolio.update({qty: newQty}, selector)

    res.sendStatus(200)
    // res.json('hello')
  } catch (err) {
    next(err)
  }
})
