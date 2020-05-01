import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

import UserContext from './UserContext'
import PostcodeContext from './PostcodeContext'
import Chatroom from './Chatroom'
import Register from './Register'
import Login from './Login'

const initialLoginState = {
  email: '',
  password: ''
}

const FoodSwap = ({ props, handleLoginRegisterModal }) => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { userPostcode, setUserPostcode } = useContext(PostcodeContext)

  const [showInstructions, setShowInstructions] = useState(true)

  const [error, setError] = useState()
  const [data, setData] = useState()
  const [form, updateForm] = useState(initialLoginState)

  function handlePostcodeSubmit(e) {
    e.preventDefault()
    axios
      .put('api/profile', data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((res) => {
        setUserPostcode(res.data.postcode)
        // console.log('foodswapdata', data)
      })
      .catch((error) => {
        setError(error.response.data.errors)
      })
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value.toUpperCase() })
    console.log(data)
  }

  function toggleInstructions() {
    setShowInstructions(!showInstructions)
  }

  return (
    <div className="section" id="food-swap">
      <div className="container">
        <div className="columns">
          {showInstructions && (
            <div className="column is-half" id="intro">
              <div className="level is-mobile">
                <div className="level-left"></div>
                <div className="level-right">
                  <div className="leve-item">
                    {showInstructions && (
                      <i
                        className="fas fa-times-circle is-size-5"
                        onClick={() => toggleInstructions()}
                      ></i>
                    )}
                  </div>
                </div>
              </div>

              <div className="title is-size-3" id="intro-title">
                The Food Community
              </div>
              <div className="subtitle is-size-4" id="intro-subtitle">
                Share Food, Waste Less, Stay Home.
              </div>
              <div className="info">
                <span>Short on ingredients? </span>In tough times, it&apos;s
                important to be able to turn to your neighbours. We&apos;ve
                created a forum for you to link up with people in your local
                area and help each other out. The aim is to avoid unnecessary
                trips to the shops, particularly if you&apos;re unwell or unable
                to leave the house.
                <br />
                <br />
                <span>How does it work? </span>Simply sign up with your postcode
                to join your forum, post what you need and wait for a friendly
                neighbour to lend a hand. Sharing is caring - play an active
                part in the community by sharing your food too!
                <br></br>
                <br></br>
                <span>
                  When you and your neighbour are ready to exchange, click{' '}
                  <i className="icon fas fa-envelope"></i> on the post to take
                  your conversation private!
                </span>
                <br />
                <br />
                <span>And remember, </span>always follow the social distancing
                guidelines when dropping off supplies.
              </div>
            </div>
          )}

          <div className="column" id="chatroom">
            {userPostcode && Auth.isAuthorized() && (
              <Chatroom
                postcode={userPostcode}
                userInfo={userInfo}
                showInstructions={showInstructions}
                toggleInstructions={toggleInstructions}
              />
            )}

            {!userPostcode && Auth.isAuthorized() && (
              <>
                <div className="level is-mobile" id="chatroom-title">
                  <div className="level-left">
                    <div className="leve-item">
                      {!showInstructions && (
                        <i
                          className="fas fa-info-circle is-size-5"
                          onClick={() => toggleInstructions()}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
                <div id="postcode-form">
                  <form action="" className="form">
                    <div className="field">
                      <label htmlFor="" className="label">
                        It seems we don&apos;t have postcode on record for you.
                        <br />
                        Please enter the first half of your postcode to be
                        connected with people nearby.
                      </label>
                      <div className="control">
                        <input
                          type="text"
                          name="postcode"
                          className="input"
                          placeholder="e.g. SW1, YO10, IV2"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button
                      className="button"
                      onClick={(e) => handlePostcodeSubmit(e)}
                    >
                      Enter
                    </button>
                  </form>
                </div>
              </>
            )}

            {!Auth.isAuthorized() && (
              <>
                <div className="level is-mobile" id="chatroom-title">
                  <div className="level-left">
                    <div className="leve-item">
                      {!showInstructions && (
                        <i
                          className="fas fa-info-circle is-size-5"
                          onClick={() => toggleInstructions()}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
                <div id="sign-up">
                  You must be logged in to join the Community:
                  <br></br>
                  <br></br>
                  <Link
                    className="join-link"
                    onClick={() => handleLoginRegisterModal('register')}
                  >
                    Register
                  </Link>
                  <Link
                    className="join-link"
                    onClick={() => handleLoginRegisterModal('login')}
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodSwap
