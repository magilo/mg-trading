import axios from 'axios'
// import { APIToken } from "../../../secrets";
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const STOCK_OWNED = 'STOCK_OWNED'
const STOCK_PRICES = 'STOCK_PRICES'
const ADD_STOCK = 'ADD_STOCK'

/**
 * ACTION CREATORS
 */

const getStockOwned = portfolio => ({
  type: STOCK_OWNED,
  portfolio
})

const getAllPrices = portfolio => ({
  type: STOCK_PRICES,
  portfolio
})

const addBoughtStock = (stock, quantity) => ({
  type: ADD_STOCK
})

/**
 * THUNK CREATORS
 */

export const loadMyStocksThunk = user => async dispatch => {
  try {
    // console.log('inside loadMyStocks')
    const {data} = await axios.get(`/api/users/${user.id}/transactions`)
    let myPortfolio = data.map(function(stock) {
      const symbol = stock.symbol
      return {
        symbol: stock.symbol,
        qty: stock.qty
      }
    })
    // console.log('thunk data:', data)
    // let myPortfolio = {}
    // data.forEach(async function (stock) {
    //   const symbol = stock.symbol
    //   const getQuote = await axios.get(
    //     `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
    //   )
    //   myPortfolio[symbol] = {
    //     qty: stock.qty,
    //     quote: getQuote.data
    //   }
    // })
    // console.log('myPortfolio', myPortfolio)
    dispatch(getStockOwned(myPortfolio))
  } catch (err) {
    console.error(err)
  }
}

// export const loadQuoteThunk = symbol => {
//   return async dispatch => {
//     try {
//       // let stock = 'aapl'
//       console.log('symbol', symbol)
//       // let stock = symbol;
//       // let APIToken = 'placeholder'
//       const {data} = await axios.get(
//         `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
//       )
//       console.log('inside loadStocksThunk', data)
//       dispatch(getQuote(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

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
export function portfolioReducer(portfolio = [], action) {
  switch (action.type) {
    case STOCK_OWNED:
      // console.log('inside portfolioReducer', action)
      return action.portfolio
    case ADD_STOCK:
      console.log(action.stock)
      return action.portfolio
    default:
      return portfolio
  }
}
