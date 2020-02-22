import axios from 'axios'
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
    let getQuotes = await Promise.all(
      Object.keys(portfolio).map(async function(symbol) {
        let {data} = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
        )
        return data
      })
    )

    dispatch(getAllPrices(getQuotes))
  } catch (err) {
    console.error(err)
  }
}

export function pricesReducer(prices = [], action) {
  switch (action.type) {
    case STOCK_PRICES:
      return action.prices
    default:
      return prices
  }
}
