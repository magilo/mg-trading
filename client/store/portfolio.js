import axios from 'axios'
// import { APIToken } from "../../../secrets";
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const BUY_STOCK = 'BUY_STOCK'

/**
 * ACTION CREATORS
 */

const buyStock = quantity => ({
  type: BUY_STOCK
})

/**
 * THUNK CREATORS
 */

//  export const buyStockThunk = (quantity) => {
//    return async dispatch => {

//    }
//  }
// export const loadQuoteThunk = symbol => {
//   return async dispatch => {
//     try {
//       // let stock = 'aapl'
//       console.log('symbol', symbol)
//       // let stock = symbol;
//       // let APIToken = 'placeholder'
//       const { data } = await axios.get(
//         `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
//       )
//       console.log('inside loadStocksThunk', data)
//       dispatch(getQuote(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

/**
 * REDUCER
 */
export function portfolioReducer(portfolio = {}, action) {
  switch (action.type) {
    case BUY_STOCK:
      console.log('inside portfolioReducer')
      return action.portfolio
    default:
      return portfolio
  }
}
