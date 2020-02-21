import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Portfolio from './portfolio'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, balance} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h3>Balance: ${balance}</h3>
      <Portfolio />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    email: state.user.email,
    balance: state.user.balance
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
