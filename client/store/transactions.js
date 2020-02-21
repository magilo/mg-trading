import axios from 'axios'
// import { APIToken } from "../../../secrets";
// const { APIToken } = require('../../secrets')

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
    const {data} = await axios.get(`/api/users/${user.id}/transactions`)
    dispatch(getUserTransactions(data))
  } catch (err) {
    console.error(err)
  }
}

export const newTransactionThunk = (user, transaction) => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/users/${user.id}/transactions`,
      transaction
    )
    // console.log('inside trans thunk', user, transaction)
    // console.log('trans thunk res', data)
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
      return action.user
    case ADD_TRANSACTION:
      // console.log('trans action', action)
      // console.log('curr trans in reducer', transactions)
      return [...transactions, action.transaction]
    default:
      return transactions
  }
}
