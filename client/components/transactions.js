import React from 'react'
import {connect} from 'react-redux'
import {userTransactionsThunk} from '../store'

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
    // console.log('this.props', this.props)
    this.props.loadMyTransactions(this.props.user)
  }

  render() {
    console.log('transactions props', this.props.transactions)
    const transactions = this.props.transactions
    return (
      <div>
        <h3>my transactions</h3>
        {transactions.map(function(stock) {
          return (
            <div className="TransactionContainer" key={stock.id}>
              <span>
                (buy)--{stock.symbol}--{stock.qty} shares @{' '}
                {stock.purchasePrice} on {stock.orderDate}
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
  console.log('inside transactions', state)
  return {
    user: state.user,
    transactions: state.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    loadMyTransactions: user => dispatch(userTransactionsThunk(user))
  }
}

export default connect(mapState, mapDispatch)(Transactions)

// export default Transactions
