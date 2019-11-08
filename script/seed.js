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
const faker = require('faker')

const randomNum = num => {
  return Math.floor(Math.random() * num) + 1
}
const randomAdj = adjs => {
  return adjs[this.randomNum(adjs.length - 1)]
}
const mealInd = [1, 2, 3, 4, 8, 9, 11, 13]
// FOOD STUFF `http://lorempixel.com/256/256/food/${foodInd}` //random of foodInd.length
const dinnerAdj = [
  'Hearty ',
  'Delicous ',
  'Healthy ',
  'Gluten-free ',
  '1 day old ',
  '2 day old ',
  '3 day old ',
  'Expired ',
  'Ready-made ',
  'Half-eaten',
  'Quick and Easy ',
  "Yesterday's ",
  'Average ',
  'Disgusting ',
  'Leftover ',
  'Moldy ',
  'Surprisingly tasty '
]
const transInd = [1, 2, 4, 5, 6, 8, 9, 15]
const transportAdj = [
  'Deluxe ',
  'State of the Art ',
  'Fashionable ',
  'Double-decker ',
  'Really nice ',
  'Yung ',
  'Fast ',
  'Slow ',
  'Underwhelming ',
  'Small ',
  'Large ',
  'Electric ',
  'Hybrid',
  'Sleek ',
  'Armored ',
  'Military-grade ',
  'Rusty ',
  'Model G61',
  'Model M49',
  'Model RT0',
  'Model BV3',
  'Model JH8',
  'Model LK0',
  'Model AS1',
  'Model NY6',
  'Model LK9',
  'Model RE5',
  'Model PO9',
  'Model WS2',
  'Model GF3'
]
const anmlAdj = [
  'Fluffy ',
  'Genuine ',
  'Recently groomed ',
  'Recently rescued ',
  'Hirsute ',
  'White ',
  'Orange ',
  'Loving ',
  'Good ',
  'Cool '
]

const techInd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 19, 20]
const techAdj = [
  'Ancient ',
  'Cybernetic',
  'State of the Art ',
  'Really sick ',
  'Dope ',
  'Really old ',
  'Cool smart ',
  'Great awesome ',
  'Yung ',
  'Unbelievably functional ',
  'New ',
  'High-quality ',
  'Wearable ',
  'Educational '
]

class Food {
  constructor() {
    //eventually take in a typestring
    //typestring to be meal, snack, dinner, lunch, breakfast
    this.name = randomAdj(dinnerAdj) + 'meal'
    this.description = '' //bacon text for food? yeee
    this.quantity = randomNum(20)
    this.imageUrl = [
      `http://lorempixel.com/256/256/food/${
        mealInd[randomNum(mealInd.length - 1)]
      }`
    ]
  }
}
class Transport {
  constructor() {
    //typestring
    //type to be carrier, vehicle, portability, fancy alternative to walking
    this.name = randomAdj(transportAdj) + 'vehicle'
    this.description =
      'Great way of getting around. Not too expensive and wonderfully made'
    this.quantity = randomNum(5)
    this.imageUrl = [
      `http://lorempixel.com/256/256/food/${
        transInd[randomNum(transInd.length - 1)]
      }`
    ]
  }
}
class Animal {
  constructor(typeString) {
    //typestring
    //type to be dude, small guy, bigboi, pal, lil guy
    this.name = randomAdj(anmlAdj) + 'pal'
    this.description = ''
    this.quantity = 1
    this.imageUrl = [`http://lorempixel.com/256/256/food/${randomNum(20)}`]
  }
}
class Tech {
  constructor(typeString) {
    //typestring
    //type to be tech, technology, piece of science, machinery, piece of tech
    this.name = randomAdj(techAdj) + 'technology'
    this.description =
      'Great way of getting around. Not too expensive and wonderfully made'
    this.quantity = randomNum(5)
    this.imageUrl = [
      `http://lorempixel.com/256/256/food/${
        techInd[randomNum(techInd.length - 1)]
      }`
    ]
  }
}

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
  const categories = await Promise.all([
    Category.create({name: 'Food'}),
    Category.create({name: 'Transport'}),
    Category.create({name: 'Animals'}),
    Category.create({name: 'Technology'})
  ])
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
    products[2].addCategory(categories)
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
