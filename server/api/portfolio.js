const router = require('express').Router()
const {User, Portfolio} = require('../db/models')
module.exports = router

//mounted on api/portfolio
// router.get('/', async (req, res, next) => {
//   try {
//     // const user = await User.findByPk(req.params.userId)
//     // res.json(user)
//     const pugsWithTheirOwners = await User.findAll({
//       include: [{ model: Portfolio }]
//     })
//     res.json(pugsWithTheirOwners)
//   } catch (err) {
//     next(err)
//   }
// })
