import axios from 'axios'

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
      return [...transactions, action.transaction]
    default:
      return transactions
  }
}
