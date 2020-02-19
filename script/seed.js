'use strict'

const db = require('../server/db')
const {User, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const transactions = await Promise.all([
    Transaction.create({
      symbol: 'AAPL',
      qty: 2,
      purchasePrice: 10000,
      userId: 1
    }),
    Transaction.create({
      symbol: 'FB',
      qty: 5,
      purchasePrice: 12300,
      userId: 2
    }),
    Transaction.create({
      symbol: 'SE',
      qty: 5,
      purchasePrice: 2000,
      userId: 1
    })
  ])

  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)

  // const portfolios = await Promise.all([
  //   Portfolio.create({
  //     symbol: 'LIC',
  //     qty: 2,
  //     price: 1000,
  //     userId: 1
  //   }),
  //   Portfolio.create({
  //     symbol: 'HELLO',
  //     qty: 5,
  //     price: 123,
  //     userId: 2
  //   }),
  //   Portfolio.create({
  //     symbol: 'WORLD',
  //     qty: 5,
  //     price: 20,
  //     userId: 1
  //   }),
  // ])

  // console.log(`seeded ${portfolios.length} portfolios`)
  // console.log(`seeded successfully`)

  // const myPortfolio = [
  //   {
  //     name: 'Basic Stock',
  //     description: 'get your head in the game',
  //     price: 10
  //   },
  //   {
  //     name: 'Advanced Stock',
  //     description: 'in too deep now',
  //     price: 100
  //   }
  // ]

  // const returnedPortfolio = await Promise.all(
  //   myPortfolio.map(portfolio => {
  //     return Portfolio.create(portfolio)
  //   })
  // )

  // console.log(`seeded ${returnedPortfolio} myPortfolio`)
  // console.log(`seeded successfully`)
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
