import React from 'react'
import {connect} from 'react-redux'
import {userTransactionsThunk} from '../store'
import {roundThis} from '../utility-funcs'

/**
 * COMPONENT
 */
//view user's transaction history
class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadMyTransactions(this.props.user)
  }

  render() {
    const transactions = this.props.transactions

    return (
      <div>
        <h3>my transactions</h3>
        {transactions.map(function(stock) {
          return (
            <div className="TransactionContainer" key={stock.id}>
              <span>
                (buy) -- {stock.symbol} -- {stock.qty} shares @{' '}
                {roundThis(stock.purchasePrice)} on {stock.orderDate}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    transactions: state.transactions,
    portfolio: state.portfolio
  }
}

const mapDispatch = dispatch => {
  return {
    loadMyTransactions: user => dispatch(userTransactionsThunk(user))
  }
}

export default connect(mapState, mapDispatch)(Transactions)
