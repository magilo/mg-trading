import React from 'react'

const red = {color: 'red'}
const green = {color: 'green'}
const grey = {color: 'grey'}

function PriceColor(props) {
  const latestPrice = props.latestPrice
  let open = props.open
  const previousClose = props.previousClose
  if (open === null) {
    open = previousClose
  }
  //prop types are numbers
  if (latestPrice > open) {
    return <span style={green}>{latestPrice}</span>
  } else if (latestPrice < open) {
    return <span style={red}>{latestPrice}</span>
  } else {
    return <span style={grey}>{latestPrice}</span>
  }
}

export default PriceColor
