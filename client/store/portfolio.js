import axios from 'axios'
// import { APIToken } from "../../../secrets";
// const { APIToken } = require('../../secrets')

/**
 * ACTION TYPES
 */
// const STOCK_OWNED = 'STOCK_OWNED'
// const STOCK_PRICES = 'STOCK_PRICES'
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const ADD_STOCK = 'ADD_STOCK'

/**
 * ACTION CREATORS
 */

// const getStockOwned = portfolio => ({
//   type: STOCK_OWNED,
//   portfolio
// })

const getMyPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

// const getAllPrices = portfolio => ({
//   type: STOCK_PRICES,
//   portfolio
// })

const addBoughtStock = stock => ({
  type: ADD_STOCK,
  stock
})

/**
 * THUNK CREATORS
 */
export const loadPortfolioThunk = user => async dispatch => {
  try {
    // console.log('loadPortfolioThunk')
    const {data} = await axios.get(`/api/users/${user.id}/portfolio`)

    // console.log('loadPortfolioThunk res', res)
    let myPortfolio = {}
    data.forEach(function(stock) {
      const symbol = stock.symbol
      const currQty = stock.portfolio.qty
      myPortfolio[symbol] = {
        qty: currQty
      }
    })
    dispatch(getMyPortfolio(myPortfolio))
  } catch (err) {
    console.error(err)
  }
}

// export const loadMyStocksThunk = user => async dispatch => {
//   try {
//     // console.log('inside loadMyStocks')
//     const { data } = await axios.get(`/api/users/${user.id}/transactions`)
//     let myPortfolio = {}
//     data.forEach(function (stock) {
//       const symbol = stock.symbol
//       myPortfolio[symbol] = {
//         qty: stock.qty
//       }
//     })
//     dispatch(getStockOwned(myPortfolio))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const addStockToPortfolioThunk = (
  user,
  transaction
) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}/portfolio`, transaction)
    console.log('add stock thunk', res)
    // dispatch(addBoughtStock(stock, quantity))
    dispatch(addBoughtStock())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export function portfolioReducer(portfolio = {}, action) {
  switch (action.type) {
    // case STOCK_OWNED:
    //   return action.portfolio
    case GET_PORTFOLIO:
      return action.portfolio
    case ADD_STOCK:
      console.log('inside portfolioReducer', action)
      return portfolio
    default:
      return portfolio
  }
}
