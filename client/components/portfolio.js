import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Portfolio = props => {
  // const { email, balance } = props
  return (
    <div>
      <h3>PORTFOLIO</h3>
      <h6>owned stocks</h6>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    // email: state.user.email,
    // balance: state.user.balance
  }
}

export default connect(mapState)(Portfolio)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
