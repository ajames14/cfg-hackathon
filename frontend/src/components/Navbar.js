import React, { useContext, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/auth'
import UserContext from './UserContext'

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)

  const handleMenu = () => {
    const burger = document.querySelector('.burger')
    const menuList = document.querySelector('#' + burger.dataset.target)

    burger.classList.toggle('is-active')
    menuList.classList.toggle('is-active')
  }

  function handleLogout() {
    Auth.logout()
  }

  return (
    <nav
      className="navbar is-white is-fixed-top is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link id="homeicon" className="navbar-item has-text-centered" to="/">
          waste
          <span className="thin">not</span>
          want
          <span className="thin">not</span>
        </Link>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navDrop"
          onClick={handleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navDrop" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link className="navbar-link is-arrowless" to="/about">
              Info
            </Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="navbar-link is-arrowless" to="/recipes">
              Recipe Book
            </Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="navbar-link is-arrowless" to="/foodswap">
              Food Community
            </Link>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            {userInfo ? (
              <Link
                className="navbar-link is-arrowless"
                id="profile"
                to="/profile"
              >
                {userInfo.username}
              </Link>
            ) : (
              <div className="navbar-item is-arrowless">Profile</div>
            )}
            <div
              className="navbar-dropdown is-boxed"
              style={{ marginRight: 20 }}
            >
              {!userInfo && (
                <Link className="navbar-item" id="register" to="/register">
                  Register
                </Link>
              )}
              {!userInfo && (
                <Link className="navbar-item" id="login" to="/login">
                  Login
                </Link>
              )}
              {Auth.isAuthorized() && (
                <Link
                  className="navbar-item"
                  id="logout"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
