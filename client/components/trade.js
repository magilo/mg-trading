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
      tradeHistory: ''
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
    const {user} = this.props
    event.preventDefault()

    const updatedUser = {
      username: this.state.username || user.username,
      name: this.state.name || user.name,
      address: this.state.address || user.address,
      email: this.state.email || user.email,
      profileImgUrl: this.state.profileImgUrl || user.profileImgUrl,
      id: user.id //<-- needs id to be pass from props into thunk
    }
    console.log('handlesubmit: ', updatedUser)
    this.props.editUserThunk(updatedUser)
    this.setState({
      username: '',
      name: '',
      email: '',
      address: '',
      profileImgUrl: ''
    })
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <h2>Welcome, {user.username}</h2>
        {/* <h3>Welcome, {user.email}</h3> */}
        Name: {user.name} <br />
        <p>Email: {user.email}</p>
        <br />
        address: {user.address}
        <br />
        Profile Img: <img className="profileImage" src={user.profileImgUrl} />
        <br />
        <Link to="/home/edit">Edit your account</Link>
        <br />
        <Link to="/home/history">Past Orders</Link>
        <hr />
        <Route
          path="/home/edit"
          render={() => (
            <EditUserForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              user={this.state}
            />
          )}
        />
        <Route path="/home/history" render={() => <OrderHistory />} />
      </div>
    )
  }
}

export default Trade

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     editUserThunk: user => dispatch(editUserThunk(user))
//   }
// }

// export default connect(mapState, mapDispatchToProps)(UserHome)

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
