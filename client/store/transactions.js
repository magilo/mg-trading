import axios from 'axios'
// import { APIToken } from "../../../secrets";
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const GET_USER_TRANSACTIONS = 'GET_USER_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

/**
 * ACTION CREATORS
 */

const getUserTransactions = user => ({
  type: GET_USER_TRANSACTIONS,
  user
})

const addNewTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction
})

/**
 * THUNK CREATORS
 */

export const userTransactionsThunk = user => async dispatch => {
  try {
    // console.log('inside loadMyStocks')
    const {data} = await axios.get(`/api/users/${user.id}/transactions`)

    dispatch(getUserTransactions(data))
  } catch (err) {
    console.error(err)
  }
}

export const newTransactionThunk = user => async dispatch => {
  try {
    // console.log('inside loadMyStocks')
    const {data} = await axios.post(`/api/users/${user.id}/transactions`)
    console.log()
    dispatch(addNewTransaction(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export function transactionReducer(transactions = [], action) {
  switch (action.type) {
    case GET_USER_TRANSACTIONS:
      console.log('inside trans reducer', action)
      return action.user
    case ADD_TRANSACTION:
      return action.transactions
    default:
      return transactions
  }
}

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
