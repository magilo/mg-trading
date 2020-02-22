import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  loadQuoteThunk,
  loadAllPricesThunk,
  getTotalValue,
  loadPortfolioThunk
} from '../store'
import {roundThis} from '../utility-funcs'
import PriceColor from './price-color'

/**
 * COMPONENT
 */

class Portfolio extends Component {
  componentDidMount() {
    this.props.loadMyPortfolio(this.props.user)
  }

  componentDidUpdate(prevProps) {
    /*** checks if portfolio is loaded inorder to load prices ***/
    if (
      Object.keys(this.props.portfolio).length !==
      Object.keys(prevProps.portfolio).length
    ) {
      const prices = this.props.loadAllPrices(this.props.portfolio)
    }

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
      addedValues = roundThis(addedValues)
      addedValues = '$' + addedValues.toString()
      allValuations.totalValue = addedValues
      this.props.getValuation(allValuations)
    }
  }

  render() {
    const portfolio = this.props.portfolio
    const prices = this.props.prices
    return (
      <div>
        {/* totalValue does not update dynamically right after stock is purchased */}
        <h3>MY PORTFOLIO {this.props.valuation.totalValue}</h3>
        <div className="QuoteTest">
          {prices.map(stock => (
            <div className="SinglePortfolio" key={stock.symbol}>
              <h4>
                {stock.symbol} -- {portfolio[stock.symbol].qty} shares @ ${roundThis(
                  portfolio[stock.symbol].qty * stock.latestPrice
                )}
                <div>
                  latest price--
                  <PriceColor
                    latestPrice={stock.latestPrice}
                    open={stock.open}
                    previousClose={stock.previousClose}
                  />
                </div>
              </h4>
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
  return {
    user: state.user,
    portfolio: state.portfolio,
    prices: state.prices,
    valuation: state.valuation
  }
}

const mapDispatch = dispatch => {
  return {
    getStock: symbol => dispatch(loadQuoteThunk(symbol)),
    loadAllPrices: portfolio => dispatch(loadAllPricesThunk(portfolio)),
    getValuation: total => dispatch(getTotalValue(total)),
    loadMyPortfolio: user => dispatch(loadPortfolioThunk(user))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
