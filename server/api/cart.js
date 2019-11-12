//worry about importing later
const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {
  Order,
  PricingHistory,
  Product,
  PurchaseProfile
} = require('../db/models')

/*const orderIncludes = [
  {
    model: PurchaseProfile
  },
  {
    model: Product,
    include: [
      {
        model: PricingHistory,
        where: {
          effectiveDate: {
            [Op.lt]: new Date()
          }
        },
        order: [['effectiveDate', 'DESC']],
        limit: 1
      }
    ]
  }
]*/

router.get('/', async (req, res, next) => {
  try {
    // console.log(req.user)
    if (req.user) {
      const userCart = await req.user.getOrder({
        include: [
          {
            model: PurchaseProfile
          },
          {
            model: Product,
            include: [
              {
                model: PricingHistory,
                where: {
                  effectiveDate: {
                    [Op.lt]: new Date()
                  }
                },
                order: [['effectiveDate', 'DESC']],
                limit: 1
              }
            ]
          }
        ]
      })
      //console.log(userCart)
      if (userCart) {
        return res.json(userCart)
      } else {
        /*
        If there's no user cart found, two cases.
        Case 1 - there's just not a cart
        Case 2 - there's a cart that has a purchase profile, and hence has no user.
        So, we can do something like Order.findOne({
          where: {
            status: 'Pending'

          },
          include: [
            {
              model: PurchaseProfile,
              where: {
                userId: req.user.id
              }
            }
          ]
        })
        */
        const vPP = await Order.findOne({
          where: {
            status: 'pending'
          },
          include: [
            {
              model: PurchaseProfile,
              where: {
                userId: req.user.id
              }
            },
            {
              model: Product,
              include: [
                {
                  model: PricingHistory,
                  where: {
                    effectiveDate: {
                      [Op.lt]: new Date()
                    }
                  },
                  order: [['effectiveDate', 'DESC']],
                  limit: 1
                }
              ]
            }
          ]
        })
        if (vPP) {
          return res.json(vPP)
        }
      }
    }
    const cart = await Order.findOne({
      where: {
        status: 'pending',
        sessionId: req.session.id
      },
      include: [
        {
          model: PurchaseProfile
        },
        {
          model: Product,
          include: [
            {
              model: PricingHistory,
              where: {
                effectiveDate: {
                  [Op.lt]: new Date()
                }
              },
              order: [['effectiveDate', 'DESC']],
              limit: 1
            }
          ]
        }
      ]
    })
    if (!cart) res.json({})
    else res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
