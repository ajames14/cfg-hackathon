import React, { useContext, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/auth'
import UserContext from './UserContext'
import PostcodeContext from './PostcodeContext'

const Navbar = ({ handleLoginRegisterModal, history }) => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { userPostcode, setUserPostcode } = useContext(PostcodeContext)

  const handleMenu = () => {
    const burger = document.querySelector('.burger')
    const menuList = document.querySelector('#' + burger.dataset.target)

    burger.classList.toggle('is-active')
    menuList.classList.toggle('is-active')
  }

  useEffect(() => {
    const burger = document.querySelector('.burger')
    const menuList = document.querySelector('#' + burger.dataset.target)

    burger.classList.remove('is-active')
    menuList.classList.remove('is-active')
    
  }, [history.location.pathname])

  function handleLogout() {
    Auth.logout()
    setUserInfo(null)
    setUserPostcode(null)
  }

  return (
    <nav
      className="navbar is-white is-fixed-top is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      {console.log('props', history)}
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
              About
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
          {Auth.isAuthorized() ? (
            <>
              <div className="navbar-item is-hoverable">
                <Link
                  className="navbar-link is-arrowless"
                  id="profile"
                  to="/profile"
                >
                  <i className="fas fa-user-circle"></i>
                </Link>
              </div>
              <div className="navbar-item is-hoverable">
                <Link
                  className="navbar-link is-arrowless"
                  to="/"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              </div>
            </>
          ) : (
            <div
              className="navbar-item is-arrowless"
              onClick={() => handleLoginRegisterModal('login')}
            >
              <i className="fas fa-user-circle"></i>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
