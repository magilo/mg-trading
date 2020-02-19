import axios from 'axios'
// import { APIToken } from "../../../secrets";
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const STOCK_PRICES = 'STOCK_PRICES'

/**
 * ACTION CREATORS
 */

const getAllPrices = prices => ({
  type: STOCK_PRICES,
  prices
})

export const loadAllPricesThunk = portfolio => async dispatch => {
  try {
    // console.log('inside loadMyStocks')
    //portfolio is an array
    let myStockPrices = {}

    portfolio.forEach(async function(stock) {
      const symbol = stock.symbol
      const getQuote = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
      )
      myStockPrices[symbol] = {
        qty: stock.qty,
        latestPrice: getQuote.data.latestPrice
      }
    })
    console.log('myPortfolio', myStockPrices)
    dispatch(getAllPrices(myStockPrices))

    // let myPortfolio = data.map(async function (stock) {
    //   const symbol = stock.symbol
    //   const getQuote = await axios.get(
    //     `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
    //   )
    //   console.log(getQuote.data)
    //   return {
    //     symbol: stock.symbol,
    //     qty: stock.qty,
    //     quote: getQuote.data
    //   }
    // })
    // console.log('thunk data:', data)
    // let myPortfolio = {}
  } catch (err) {
    console.error(err)
  }
}

export function pricesReducer(prices = {}, action) {
  switch (action.type) {
    case STOCK_PRICES:
      return action.prices
    default:
      return prices
  }
}
