import axios from 'axios'
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const GET_QUOTE = 'GET_QUOTE'

/**
 * ACTION CREATORS
 */
const getQuote = stock => ({
  type: GET_QUOTE,
  stock
})

/**
 * THUNK CREATORS
 */
export const loadQuoteThunk = symbol => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${APIToken}`
      )
      dispatch(getQuote(data))
    } catch (error) {
      console.error(error)
      dispatch(getQuote('nodata'))
    }
  }
}

/**
 * REDUCER
 */
export function stockReducer(stock = {}, action) {
  switch (action.type) {
    case GET_QUOTE:
      return action.stock
    default:
      return stock
  }
}
