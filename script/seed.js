'use strict'

const db = require('../server/db')
const {User, Transaction, Stock, Portfolio} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const now = new Date()
  const transactions = await Promise.all([
    Transaction.create({
      symbol: 'AAPL',
      qty: 2,
      purchasePrice: 10000,
      orderDate: now,
      userId: 1
    }),
    Transaction.create({
      symbol: 'FB',
      qty: 5,
      purchasePrice: 12300,
      orderDate: now,
      userId: 2
    }),
    Transaction.create({
      symbol: 'SE',
      qty: 5,
      purchasePrice: 2000,
      orderDate: now,
      userId: 1
    })
  ])

  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)

  const stocks = await Promise.all([
    Stock.create({
      symbol: 'RISE'
    }),
    Stock.create({
      symbol: 'VRCA'
    })
  ])

  console.log(`seeded ${stocks.length} stocks`)
  console.log(`seeded successfully`)

  const portfolios = await Promise.all([
    Portfolio.create({
      qty: 22,
      stockId: 1,
      userId: 1
    }),
    Portfolio.create({
      qty: 3,
      stockId: 2,
      userId: 1
    })
  ])

  console.log(`seeded ${portfolios.length} portfolios`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
