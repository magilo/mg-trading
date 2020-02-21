import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadQuoteThunk, userBalanceUpdate, newTransactionThunk} from '../store'
// import SymbolSearch from './symbol-search'

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
        stock: '',
        quantity: ''
      }
    }
    // console.log('trade compo', this.props)
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

    // console.log('props in handlesubmit', this.props)
    // console.log('this state in handlesubmit: ', this.state)
    this.props.getStock(this.state.stock)
    this.setState({
      stock: ''
    })
  }

  handleBuySubmit(event) {
    event.preventDefault()
    // const { name, value } = event.target;
    console.log('props in handlesubmit', this.props)
    console.log('this state in handlesubmit: ', this.state)

    let errors = this.state.errors

    //add quantity and symbol validation here
    if (!this.props.stock.symbol) {
      console.log('nostock')
      errors.stock = 'no stock selected'
    } else {
      console.log('there is a stock')
      // errors.stock = `total: ${total}`
      // this.props.submitBuy(this.state.quantity)
      const latestPrice = this.props.stock.latestPrice * 100
      const total = this.state.quantity * latestPrice / 100
      if (this.props.user.balance - total >= 0) {
        console.log('can buy')
        this.props.user.balance = this.props.user.balance - total
        const newTransaction = {
          symbol: this.props.stock.symbol,
          qty: this.state.quantity,
          purchasePrice: latestPrice
        }
        this.props.updateBalance(this.props.user)
        this.props.submitBuy(this.props.user, newTransaction)
      } else {
        errors.stock = 'not enough cash'
      }
    }

    this.setState({errors: {stock: errors.stock}}, () => {
      console.log(errors)
    })

    this.setState({
      quantity: ''
    })
  }

  render() {
    // console.log('local state', this.state)
    const {errors} = this.state
    const stock = this.props.stock
    const balance = this.props.user.balance
    return (
      <div>
        <h2>TRADE balance: ${balance}</h2>
        <div>
          <h5>stock: {stock.symbol}</h5>
          <h5>latest price: {stock.latestPrice} </h5>
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
                search{' '}
              </button>
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
              {errors.stock.length > 0 && (
                <span className="error">{errors.stock}</span>
              )}
            </div>
          </form>
        </div>
        {/* <br />
        <Link to="/home/edit">Edit your account</Link>
        <br />
        <Link to="/home/history">Past Orders</Link>
        <hr /> */}

        {/* <Route path="/home/history" render={() => <OrderHistory />} /> */}
      </div>
    )
  }
}

// export default Trade

const mapStateToProps = state => {
  return {
    stock: state.stock,
    user: state.user,
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getStock: symbol => console.log('symbol is:', symbol)
    getStock: symbol => dispatch(loadQuoteThunk(symbol)),
    // buyStock: quantity => console.log('qunatity', quantity)
    // submitBuy: quantity => dispatch(buyStock(quantity))
    submitBuy: (user, transaction) =>
      dispatch(newTransactionThunk(user, transaction)),
    updateBalance: user => dispatch(userBalanceUpdate(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)
/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     stock: state.stock
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // editUserThunk: user => dispatch(editUserThunk(user))
//     getStock: (symbol) => console.log('symbol is:', symbol)
//   }
// }

// export default connect(mapState, mapDispatchToProps)(Trade)

/**
 * COMPONENT
 */
// export const Trade = props => {
//   // const { email, balance } = props
//   return (
//     <div>
//       <h3>TRADE</h3>
//       <h6>trade history</h6>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   console.log(state)
//   return {
//     // email: state.user.email,
//     // balance: state.user.balance
//   }
// }

// export default connect(mapState)(Trade)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
