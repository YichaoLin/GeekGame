// rcc: react class compnent
import React, { Component } from 'react'
//  <a></a> router style
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { PropTypes } from 'prop-types';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;
    // 这是一个JSX
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Comment
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
            <img style={{ width: '25px', marginRight: '5px' }} className="rounded-circle" src={user.avatar} alt={user.name} /> Log out
          </a>
        </li>
      </ul>
    )
    // 这是一个JSX
    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign in
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login in
          </Link>
        </li>
      </ul>
    )

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Geek Camp
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>             
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">People
                  </Link>
                </li>
              </ul> 
              {/* 根据isAuthenticated显示页面右上角的排版 */}
              {isAuthenticated ? authLinks : guestLink}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

// 将状态映射为属性
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
