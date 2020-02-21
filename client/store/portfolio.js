import axios from 'axios'
// import { APIToken } from "../../../secrets";
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const STOCK_OWNED = 'STOCK_OWNED'
// const STOCK_PRICES = 'STOCK_PRICES'
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const ADD_STOCK = 'ADD_STOCK'

/**
 * ACTION CREATORS
 */

const getStockOwned = portfolio => ({
  type: STOCK_OWNED,
  portfolio
})

const getMyPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

// const getAllPrices = portfolio => ({
//   type: STOCK_PRICES,
//   portfolio
// })

const addBoughtStock = (stock, quantity) => ({
  type: ADD_STOCK
})

/**
 * THUNK CREATORS
 */
export const loadPortfolioThunk = user => async dispatch => {
  try {
    // console.log('loadPortfolioThunk')
    const res = await axios.get(`/api/users/${user.id}/portfolio`)

    console.log('loadPortfolioThunk res', res)
    dispatch(getMyPortfolio(res))
  } catch (err) {
    console.error(err)
  }
}

export const loadMyStocksThunk = user => async dispatch => {
  try {
    // console.log('inside loadMyStocks')
    const {data} = await axios.get(`/api/users/${user.id}/transactions`)
    let myPortfolio = {}
    data.forEach(function(stock) {
      const symbol = stock.symbol
      myPortfolio[symbol] = {
        qty: stock.qty
      }
    })
    dispatch(getStockOwned(myPortfolio))
  } catch (err) {
    console.error(err)
  }
}

//  export const buyStockThunk = (quantity) => {
//    return async dispatch => {

/**
 * REDUCER
 */
export function portfolioReducer(portfolio = {}, action) {
  switch (action.type) {
    case STOCK_OWNED:
      // console.log('inside portfolioReducer', action)
      return action.portfolio
    case GET_PORTFOLIO:
      return action.portfolio
    case ADD_STOCK:
      console.log(action.stock)
      return action.portfolio
    default:
      return portfolio
  }
}
