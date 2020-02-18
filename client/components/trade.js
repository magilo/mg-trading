import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Trade = props => {
  // const { email, balance } = props
  return (
    <div>
      <h3>TRADE</h3>
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

export default connect(mapState)(Trade)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
