/* eslint-disable complexity */
/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  PurchaseProfile,
  Category,
  PricingHistory,
  Product,
  Review,
  OrderProduct
} = require('../server/db/models/index')
const faker = require('faker')

const randomInd = num => {
  return Math.floor(Math.random() * num)
}
const randomNum = (num, min = 0) => {
  return Math.floor(Math.random() * (num - min) + min) + 1
}
const randomAdj = adjs => {
  return adjs[randomInd(adjs.length)]
}
const mealInd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
  'Half-eaten ',
  'Quick and Easy ',
  "Yesterday's ",
  'Average ',
  'Disgusting ',
  'Leftover ',
  'Moldy ',
  'Surprisingly tasty '
]
const transInd = [1, 2, 3, 4, 5, 6, 8, 9, 10]
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
  'Hybrid ',
  'Sleek ',
  'Armored ',
  'Military-grade ',
  'Rusty '
]
const anmlInd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const anmlAdj = [
  'Fluffy ',
  'Genuine ',
  'Recently groomed ',
  'Recently rescued ',
  'Hairy ',
  'Mini ',
  'Large ',
  'Loving ',
  'Good ',
  'Cool '
]

const techInd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const techAdj = [
  'Ancient ',
  'Cybernetic ',
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

const foodStrings = ['meal', 'snack', 'dinner', 'lunch', 'breakfast']
class Food {
  constructor(typeString) {
    this.name = randomAdj(dinnerAdj) + typeString
    this.description = '' //bacon text for food? yeee
    this.quantity = randomNum(20)
    this.isAvailable = true
    this.imageUrl = [
      `http://lorempixel.com/256/256/food/${mealInd[randomInd(mealInd.length)]}`
    ]
  }
}
const transStrings = [
  'carrier',
  'vehicle',
  'alternative to walking',
  'transport'
]
class Transport {
  constructor(typeString) {
    //typestring
    //type to be carrier, vehicle, portability, fancy alternative to walking
    this.name = randomAdj(transportAdj) + typeString
    this.description =
      'Great way of getting around. Not too expensive and wonderfully made'
    this.quantity = randomNum(5)
    this.isAvailable = true
    this.imageUrl = [
      `http://lorempixel.com/256/256/transport/${
        transInd[randomInd(transInd.length)]
      }`
    ]
  }
}

const anmlStrings = [
  '4-legger',
  'mammal',
  'land-dweller',
  'animal',
  'mystery animal',
  'pal',
  'lil guy'
]
class Animal {
  constructor(typeString) {
    this.name = randomAdj(anmlAdj) + typeString
    this.description = ''
    this.quantity = 1
    this.isAvailable = true
    this.imageUrl = [
      `http://lorempixel.com/256/256/animals/${
        anmlInd[randomInd(anmlInd.length)]
      }`
    ]
  }
}

const techStrings = [
  'tech',
  'technology',
  'piece of science',
  'machinery',
  'jumble of tech',
  'device',
  'portable device'
]
class Tech {
  constructor(typeString) {
    //typestring
    //type to be tech, technology, piece of science, machinery, piece of tech
    this.name = randomAdj(techAdj) + typeString
    this.description =
      'Great way of getting around. Not too expensive and wonderfully made'
    this.quantity = randomNum(5)
    this.isAvailable = true
    this.imageUrl = [
      `http://lorempixel.com/256/256/technics/${
        techInd[randomInd(techInd.length)]
      }`
    ]
  }
}

class Price {
  constructor() {
    this.price = randomNum(1000)
    this.effectiveDate = Date.now() + randomNum(10000, 9999)
  }
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      username: 'MrCody',
      role: 'Admin',
      firstname: 'Cody',
      lastname: 'NotAPug',
      profilePicture: 'https://robohash.org/cody?set=set4'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      username: 'dude',
      role: 'Admin',
      firstname: 'Murphy',
      lastname: 'Dude',
      profilePicture: 'https://robohash.org/murphy?set=set2'
    })
  ])

  for (let i = 0; i < 30; i++) {
    const first = faker.name.firstName()
    const last = faker.name.lastName()
    users.push(
      await User.create({
        firstname: first,
        lastname: last,
        email: `${first}${i * 3}@email.com`,
        username: `${first[0]}${last}${i * 3}`,
        password: '123'
      })
    )
  }

  const purchaseProfiles = await Promise.all([
    PurchaseProfile.create({
      shipToName: 'me',
      shipToAddress1: '404 W Superior',
      shipToCity: 'Chicago',
      shipToState: 'IL',
      shipToPostalCode: '60666'
    }),
    PurchaseProfile.create({
      shipToName: 'definitely not me',
      shipToAddress1: '100 Sketchy Back Alley',
      shipToCity: 'Chicago',
      shipToState: 'IL',
      shipToPostalCode: '60666'
    }),
    PurchaseProfile.create({
      shipToName: 'Ma',
      shipToAddress1: '403 W Superior',
      shipToCity: 'Chicago',
      shipToState: 'IL',
      shipToPostalCode: '60666'
    })
  ])

  for (let i = 0; i < users.length; i++) {
    const newProfile = {
      email: users[i].email,
      shipToName: users[i].firstname + ' ' + users[i].lastname,
      shipToAddress1: faker.address.streetAddress('###'),
      shipToCity: faker.address.city(),
      shipToState: faker.address.stateAbbr(),
      shipToPostalCode: faker.address.zipCode('#####')
    }
    await users[i].createPurchaseProfile(newProfile)
    purchaseProfiles.push(newProfile)
  }

  const categories = await Promise.all([
    Category.create({name: 'Food'}),
    Category.create({name: 'Transport'}),
    Category.create({name: 'Animals'}),
    Category.create({name: 'Technology'})
  ])

  const products = []
  for (let i = 0; i < 30; i++) {
    products.push(
      await Product.create(
        new Food(foodStrings[randomNum(foodStrings.length - 1)])
      ).then(prod => {
        prod.addCategory(categories[0])
        prod.createPricingHistory(new Price(1000))
      })
    )
    products.push(
      await Product.create(
        new Transport(transStrings[randomNum(transStrings.length - 1)])
      ).then(prod => {
        prod.addCategory(categories[1])
        prod.createPricingHistory(new Price(1000))
      })
    )
    products.push(
      await Product.create(
        new Tech(techStrings[randomNum(techStrings.length - 1)])
      ).then(prod => {
        prod.addCategory(categories[2])
        prod.createPricingHistory(new Price(1000))
      })
    )
    products.push(
      await Product.create(
        new Animal(anmlStrings[randomNum(anmlStrings.length - 1)])
      ).then(prod => {
        prod.addCategory(categories[3])
        prod.createPricingHistory(new Price(1000))
      })
    )
  }
  for (let i = 0; i < products.length; i++) {
    if (i % 10 === 1) {
      products.isAvailable = !products.isAvailable
    }
  }

  const orders = []
  for (let i = 0; i < 15; i++) {
    orders.push(
      await Order.create({
        purchaseProfileId: randomNum(purchaseProfiles.length),
        purchasedAt: Date.now() + randomNum(5000, 1000),
        status: 'purchased'
      }).then(order => {
        order.addProduct(products[randomNum(products.length)], {
          through: {quantity: randomNum(4)}
        })
        order.addProduct(products[randomNum(products.length)], {
          through: {quantity: randomNum(4)}
        })
      })
    )
  }
  for (let i = 0; i < 20; i++) {
    const orderProducts = await Promise.all([
      OrderProduct.create({
        productId: randomNum(products.length),
        orderId: randomNum(orders.length),
        quantity: randomNum(12)
      })
    ])
  }
  for (let i = 0; i < 45; i++) {
    orders.push(
      await Order.create({
        purchaseProfileId: randomNum(purchaseProfiles.length),
        purchasedAt: Date.now() + randomNum(5000, 1000),
        status: 'fulfilled'
      }).then(order => {
        order.addProduct(products[randomNum(products.length)], {
          through: {quantity: randomNum(4)}
        })
        order.addProduct(products[randomNum(products.length)], {
          through: {quantity: randomNum(4)}
        })
      })
    )
  }

  const reviews = []
  for (let i = 0; i < 150; i++) {
    reviews.push(
      await Review.create({
        productId: randomNum(products.length),
        rating: randomNum(10),
        content: `${faker.lorem.sentence(randomNum(15))} ${faker.lorem.sentence(
          randomNum(15)
        )} ${faker.lorem.sentence(randomNum(15))}`
      }).then(rev => {
        rev.setUser(users[randomInd(users.length)])
      })
    )
  }

  //Arbitrary Associations
  await Promise.all([
    users[0].addPurchaseProfile(purchaseProfiles[0]),
    users[0].addPurchaseProfile(purchaseProfiles[1]),
    users[0].addPurchaseProfile(purchaseProfiles[2])
    // purchaseProfiles[0].addOrder(orders[0]),
    //orders[0].addProduct(products[1], {through: {quantity: 3}}),
    //orders[0].addProduct(products[2], {through: {quantity: 1}})

    //products[2].addCategory(categories)
  ])
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
