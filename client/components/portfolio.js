import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadMyStocksThunk, loadQuoteThunk, loadAllPricesThunk} from '../store'

/**
 * COMPONENT
 */

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prices: this.props.prices
    }
  }

  componentDidMount() {
    // console.log('this.props', this.props)
    this.props.loadMyStocks(this.props.user)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('derived next', nextProps)
    console.log('derived prev', prevState)
    console.log('derived keys len', Object.keys(nextProps.prices).length)
    // if (prevState.prices.length >= 0) {
    // if (JSON.stringify(nextProps.prices) !== JSON.stringify(prevState.prices)) {
    // if (Object.keys(nextProps.prices).length !== nextProps.portfolio.length) {
    if (
      Object.keys(nextProps.prices).length === 0 &&
      nextProps.portfolio.length > 0
    ) {
      const prices = nextProps.loadAllPrices(nextProps.portfolio)
      console.log('derived prices', prices)
      // this.setState({ stockPrices: prices })
      // console.log('stockPrices', this.state.stockPrices)
      return {prices: nextProps.prices}
    } else {
      return null
    }
  }

  render() {
    // console.log('portfolio state', this.state)
    const portfolio = this.props.portfolio
    console.log('portfolio props', portfolio)
    // portfolio = {
    //   AAPL: {qty: 2, quote: {…}},
    //   SE: {qty: 5, quote: {…}}
    // }
    // console.log(Object.keys(this.props.portfolio))
    return (
      <div>
        <h3>PORTFOLIO</h3>
        <div className="PortfolioContainer">
          {portfolio.map(stock => (
            <div className="SinglePortfolio" key={stock.symbol}>
              <h2>
                {stock.symbol} qty: {stock.qty}
              </h2>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
// export const Portfolio = props => {
//   // const { email, balance } = props

// }

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('inside portfolio', state)
  return {
    user: state.user,
    portfolio: state.portfolio,
    prices: state.prices
    // email: state.user.email,
    // balance: state.user.balance
  }
}

const mapDispatch = dispatch => {
  // console.log('mapdispatch', this.state)
  return {
    loadMyStocks: user => dispatch(loadMyStocksThunk(user)),
    getStock: symbol => dispatch(loadQuoteThunk(symbol)),
    loadAllPrices: portfolio => dispatch(loadAllPricesThunk(portfolio))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
