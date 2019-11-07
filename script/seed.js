'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  PurchaseProfile,
  Category,
  PricingHistory,
  Product,
  Review
} = require('../server/db/models/index')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', username: 'MrCody'}),
    User.create({email: 'murphy@email.com', password: '123', username: 'dude'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Chair',
      description: 'fantastic place to take a good old fashioned seat',
      quantity: 4
    }),
    Product.create({
      name: 'Table',
      description: 'use with chair for best effect',
      quantity: 1
    }),
    Product.create({
      name: 'Fork',
      description: 'set on table',
      quantity: 4
    }),
    Product.create({
      name: "Eric's Seat Cushion",
      description: 'set carefully on table',
      quantity: 4
    })
  ])

  const reviews = await Promise.all([
    Review.create({
      rating: 7
    }),
    Review.create({
      rating: 7
    }),
    Review.create({
      rating: 8
    }),
    Review.create({
      rating: 9,
      content: 'The best product ever made'
    })
  ])
  const orders = await Promise.all([
    Order.create({status: 'pending'}),
    Order.create({status: 'purchased'})
  ])
  const purchaseProfiles = await Promise.all([
    PurchaseProfile.create({
      shipToAddress1: '404 W Superior',
      shipToCity: 'Chicago',
      shipToState: 'IL',
      postalCode: '60666'
    })
  ])
  const categories = await Category.create({name: 'the only category'})
  const pricingHistories = await Promise.all([
    PricingHistory.create({
      price: 50,
      effectiveDate: Date.now() - 50000000
    }),
    PricingHistory.create({
      price: 30,
      effectiveDate: Date.now() - 50000000
    }),
    PricingHistory.create({
      price: 75,
      effectiveDate: Date.now()
    }),
    PricingHistory.create({
      price: 100,
      effectiveDate: Date.now() + 500000000
    })
  ])

  //Arbitrary Associations
  await Promise.all([
    users[0].addReview(reviews[0]),
    users[1].addReview(reviews[3]),
    users[0].addPurchaseProfile(purchaseProfiles[0]),
    purchaseProfiles[0].addOrder(orders[0]),
    orders[0].addProduct(products[1], {through: {quantity: 3}}),
    orders[0].addProduct(products[2], {through: {quantity: 1}}),
    products[0].addReview(reviews[3]),
    products[1].addPricingHistory(pricingHistories[0]),
    products[2].addPricingHistory(pricingHistories[1]),
    products[1].addPricingHistory(pricingHistories[2]),
    products[2].addCategory(categories[0])
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
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
