const router = require('express').Router()
const {User, Transaction} = require('../db/models')

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
    //create new row on transaction table and associate w/ user
    // set the order date
    const now = new Date()
    const formatPrice = req.body.purchasePrice * 100
    const transaction = await Transaction.create({
      symbol: req.body.symbol,
      qty: req.body.qty,
      purchasePrice: formatPrice,
      orderDate: now,
      orderDateTest: now
      // userId: req.params.userId
    })

    const singleUser = await User.findByPk(req.params.userId)
    transaction.setUser(singleUser)
    console.log('inside post transactions router')
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
