import axios from 'axios'
// import { APIToken } from "../../../secrets";
const {APIToken} = require('../../secrets')

/**
 * ACTION TYPES
 */
const TOTAL_VALUE = 'TOTAL_VALUE'

/**
 * ACTION CREATORS
 */

export const getTotalValue = valuation => ({
  type: TOTAL_VALUE,
  valuation
})

/**
 * REDUCER
 */
export function valuationReducer(valuation = '', action) {
  switch (action.type) {
    case TOTAL_VALUE:
      return action.valuation
    default:
      return valuation
  }
}
