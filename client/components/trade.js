import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  loadQuoteThunk,
  userBalanceUpdate,
  newTransactionThunk,
  addStockToPortfolioThunk
} from '../store'
import {hasOnlyDigits, roundThis} from '../utility-funcs'

/**
 * COMPONENT
 */

class Trade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stock: '',
      quantity: '',
      transactions: '',
      errors: {
        buy: '',
        search: ''
      }
    }
    this.props = this.props
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleBuySubmit = this.handleBuySubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearchSubmit(event) {
    event.preventDefault()

    this.props.getStock(this.state.stock)
    let errors = this.state.errors
    errors.buy = ''
    this.setState({errors: {buy: errors.buy}}, () => {
      console.log(errors)
    })
    this.setState({
      stock: ''
    })
  }

  handleBuySubmit(event) {
    event.preventDefault()

    let errors = this.state.errors

    //add quantity and symbol validation here
    if (!this.props.stock.symbol) {
      errors.buy = 'no stock selected'
    } else if (!hasOnlyDigits(this.state.quantity)) {
      errors.buy = 'invalid quantity'
    } else {
      errors.buy = ''
      const latestPrice = this.props.stock.latestPrice * 100
      const total = this.state.quantity * latestPrice / 100
      if (this.props.user.balance - total >= 0) {
        this.props.user.balance = roundThis(this.props.user.balance - total)

        const newTransaction = {
          symbol: this.props.stock.symbol,
          qty: this.state.quantity,
          purchasePrice: latestPrice
        }

        this.props.updateBalance(this.props.user)
        this.props.submitBuy(this.props.user, newTransaction)
        this.props.updatePortfolio(this.props.user, newTransaction)
      } else {
        errors.buy = 'not enough cash'
      }
    }

    this.setState({errors: {buy: errors.buy}}, () => {
      console.log(errors)
    })

    this.setState({
      quantity: ''
    })
  }

  render() {
    const {errors} = this.state
    const stock = this.props.stock
    const balance = this.props.user.balance
    if (this.props.stock === 'nodata') {
      errors.search = 'invalid symbol'
    } else {
      errors.search = ''
    }

    return (
      <div>
        <h2>balance: ${balance}</h2>
        <div>
          <h3>stock: {stock.symbol}</h3>
          <h3>latest price: {stock.latestPrice} </h3>
        </div>
        <div className="form">
          <form onSubmit={this.handleSearchSubmit}>
            <div>
              <input
                name="stock"
                type="text"
                value={this.state.stock}
                placeholder="e.g. AAPL"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <button type="submit" onSubmit={this.handleSearchSubmit}>
                {' '}
                submit{' '}
              </button>
            </div>
            <div>
              {errors.search.length > 0 && (
                <span className="error">{errors.search}</span>
              )}
            </div>
          </form>

          <form onSubmit={this.handleBuySubmit}>
            <div>
              <input
                name="quantity"
                type="text"
                value={this.state.quantity}
                placeholder="e.g. 5"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <button type="submit" onSubmit={this.handleBuySubmit}>
                buy
              </button>
            </div>
            <div>
              {errors.buy.length > 0 && (
                <span className="error">{errors.buy}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    user: state.user,
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStock: symbol => dispatch(loadQuoteThunk(symbol)),
    submitBuy: (user, transaction) =>
      dispatch(newTransactionThunk(user, transaction)),
    updateBalance: user => dispatch(userBalanceUpdate(user)),
    updatePortfolio: (user, transaction) =>
      dispatch(addStockToPortfolioThunk(user, transaction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)
