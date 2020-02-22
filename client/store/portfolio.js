import axios from 'axios'

/**
 * ACTION TYPES
 */
// const STOCK_PRICES = 'STOCK_PRICES'
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const ADD_STOCK = 'ADD_STOCK'

/**
 * ACTION CREATORS
 */

const getMyPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

// add this back later to get portfolio price dynamically?
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
    const {data} = await axios.get(`/api/users/${user.id}/portfolio`)

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

export const addStockToPortfolioThunk = (
  user,
  transaction
) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}/portfolio`, transaction)
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
    case GET_PORTFOLIO:
      return action.portfolio
    case ADD_STOCK:
      return portfolio
    default:
      return portfolio
  }
}
