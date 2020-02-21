import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  loadMyStocksThunk,
  loadQuoteThunk,
  loadAllPricesThunk,
  getTotalValue
} from '../store'
import PriceColor from './price-color'

/**
 * COMPONENT
 */

class Portfolio extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     todaysQuotes: [], //idea: store current quote pull here?
  //     totalValue: 'hello',
  //     valuation: { totalValue: '' }
  //   }
  // }

  componentDidMount() {
    // console.log('this.props', this.props)
    this.props.loadMyStocks(this.props.user)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.props.portfolio.length !== prevProps.portfolio.length) {
    //   // this.fetchData(this.props.userID);
    //   console.log('didUpdate prev', prevProps.portfolio.length)
    //   console.log('didUpdate this', this.props.portfolio.length)
    //   const prices = this.props.loadAllPrices(this.props.portfolio)
    //   console.log('didupdate prices', prices)
    // }

    /*** checks if portfolio is loaded inorder to load prices ***/
    if (
      Object.keys(this.props.portfolio).length !==
      Object.keys(prevProps.portfolio).length
    ) {
      // console.log('didUpdate prev', Object.keys(prevProps.portfolio).length)
      // console.log('didUpdate this', Object.keys(this.props.portfolio).length)
      const prices = this.props.loadAllPrices(this.props.portfolio)
      // console.log('didupdate prices', prices)
      // const totalValue = prices.reduce((a, b) => a + b, 0)
    }
    // console.log('didupdate after if', this.props.prices)

    /*** gets total value of portfolio ***/
    if (this.props.prices.length !== prevProps.prices.length) {
      const myPortfolio = this.props.portfolio
      const myPrices = this.props.prices
      const allValuations = {totalValue: ''}
      myPrices.forEach(function(stock) {
        const symbol = stock.symbol
        const currentValuation =
          '$' + (stock.latestPrice * myPortfolio[symbol].qty).toString()
        allValuations[symbol] = {
          currValue: currentValuation
        }
      })
      let addedValues = myPrices.reduce(function(accumulator, currentValue) {
        return (
          accumulator +
          currentValue.latestPrice * myPortfolio[currentValue.symbol].qty
        )
      }, 0)
      // console.log(totalValue)
      addedValues = '$' + addedValues.toString()
      allValuations.totalValue = addedValues
      this.props.getValuation(allValuations)

      // console.log('didupdate props values', this.props)
      // this.setState({ valuation: this.props.valuation })
    }

    // if (
    //   Object.keys(this.props.valuation).length !==
    //   Object.keys(prevProps.valuation).length
    // ) {
    //   console.log('didUpdate prev', Object.keys(prevProps.valuation).length)
    //   console.log('didUpdate this', Object.keys(this.props.valuation).length)
    //   this.setState({ valuation: this.props.valuation })
    // }
  }

  render() {
    // console.log('portfolio state', this.state)
    const portfolio = this.props.portfolio
    const prices = this.props.prices
    // console.log('portfolio props', portfolio)
    // console.log('prices props', this.props.prices)
    // const valuation = this.props.valuation
    // console.log('valuation local', this.state.valuation)
    return (
      <div>
        <h3>MY PORTFOLIO {this.props.valuation.totalValue}</h3>
        <div className="QuoteTest">
          {prices.map(stock => (
            <div className="SinglePortfolio" key={stock.symbol}>
              <h2>
                {stock.symbol}
                value: ${portfolio[stock.symbol].qty * stock.latestPrice}
                qty: {portfolio[stock.symbol].qty}
                <br />
                latest price:{' '}
                <PriceColor
                  latestPrice={stock.latestPrice}
                  open={stock.open}
                  previousClose={stock.previousClose}
                />
              </h2>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('inside portfolio', state)
  return {
    user: state.user,
    portfolio: state.portfolio,
    prices: state.prices,
    valuation: state.valuation
    // email: state.user.email,
    // balance: state.user.balance
  }
}

const mapDispatch = dispatch => {
  // console.log('mapdispatch', this.state)
  return {
    loadMyStocks: user => dispatch(loadMyStocksThunk(user)),
    getStock: symbol => dispatch(loadQuoteThunk(symbol)),
    loadAllPrices: portfolio => dispatch(loadAllPricesThunk(portfolio)),
    getValuation: total => dispatch(getTotalValue(total))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
