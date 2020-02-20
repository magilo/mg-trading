import React from 'react'

const red = {color: 'red'}
const green = {color: 'green'}
const grey = {color: 'grey'}

function PriceColor(props) {
  // console.log('pricecolor props', props)
  const latestPrice = props.latestPrice
  let open = props.open
  const previousClose = props.previousClose
  if (open === null) {
    open = previousClose
  }
  //prop types are numbers
  if (latestPrice > open) {
    return <div style={green}>{latestPrice}</div>
  } else if (latestPrice < open) {
    return <h6 style={red}>{latestPrice}</h6>
  } else {
    return <h6 style={grey}>{latestPrice}</h6>
  }
}

export default PriceColor
