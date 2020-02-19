const router = require('express').Router()
const {User} = require('../db/models')
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
    user.balance = req.body.balance
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})
// router.put('/:userId/balance', async (req, res, next) => {
//   try {
//     const singleUser = await User.findByPk(req.params.userId)
//     const balanceOnly = {
//       balance: singleUser.balance
//     }
//     res.sendStatus(200)
//   } catch (err) {
//     next(err)
//   }
// })
