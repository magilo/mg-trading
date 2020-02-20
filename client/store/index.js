import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {stockReducer} from './stock'
import {portfolioReducer} from './portfolio'
import {pricesReducer} from './prices'
import {valuationReducer} from './valuation'
import {transactionReducer} from './transactions'

const reducer = combineReducers({
  user,
  stock: stockReducer,
  portfolio: portfolioReducer,
  prices: pricesReducer,
  valuation: valuationReducer,
  transactions: transactionReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './stock'
export * from './portfolio'
export * from './prices'
export * from './valuation'
export * from './transactions'
