const PricingHistory = require('/server/db/pricingHistory')
const Sequelize = require('sequelize')
module.exports = {
  toDollars: cents => {
    return `${cents - cents % 100}.%{cents%100}`
  },
  mostRecentValidDate: {
    model: PricingHistory,
    order: [['effectiveDate', 'DESC']],
    where: {effectiveDate: {[Sequelize.Op.lte]: new Date()}},
    limit: 1,
    required: false
  }
}
