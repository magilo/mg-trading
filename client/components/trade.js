import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SymbolSearch from './symbol-search'

/**
 * COMPONENT
 */

class Trade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stock: '',
      transactions: ''
    }
    this.props = this.props
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    // const { user } = this.props
    event.preventDefault()

    // this.setState({ stock: event.target.value })
    // const currentStock = {
    //   stock: this.state.stock || 'no stock yet',
    //   transactions: this.state.transactions || "no transactions"
    // }
    console.log('props in handlesubmit', this.props)
    console.log('this state in handlesubmit: ', this.state)
    this.props.getStock(this.state.stock)
    // this.props.editUserThunk(updatedUser)
    // this.setState({
    //   username: '',
    //   name: '',
    //   email: '',
    //   address: '',
    //   profileImgUrl: ''
    // })
  }

  render() {
    // const { stok } = this.props
    // console.log('trade props', this.props)
    return (
      <div>
        <h2>TRADE</h2>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div>
              {/* <label htmlFor="symbol">
                <small>symb</small>
              </label> */}
              <input
                name="stock"
                type="text"
                value={this.state.stock}
                // value="enter symbol here"
                placeholder="e.g. AAPL"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <button type="submit" onSubmit={this.handleSubmit}>
                search
              </button>
            </div>
          </form>
        </div>
        {/* <br />
        <Link to="/home/edit">Edit your account</Link>
        <br />
        <Link to="/home/history">Past Orders</Link>
        <hr /> */}

        {/* <SymbolSearch
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          props={this.state}
        /> */}

        {/* <Route path="/home/history" render={() => <OrderHistory />} /> */}
      </div>
    )
  }
}

// export default Trade

const mapDispatchToProps = dispatch => {
  return {
    // getStock: (symbol) => this.setState({ stock: symbol })
    getStock: symbol => console.log('symbol is:', symbol)
  }
}

export default connect(null, mapDispatchToProps)(Trade)
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
