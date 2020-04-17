/************
 * 
 * METHOD:
 * if statement or '? :' line of code that checks if userInfo.postcode !== null  
 * if null --> show form to enter postcode --> PUT request to user profile 
 * if userInfo = null, then show a register form 
 * this will then refresh/update userInfo (if possible without refreshing the page)
 * if postcode exists show <Chatroom /> - similar logic to buttons in my side project
 * in chatroom component, the check to match user postcode to chat postcode will be here 
 
 ***********/

import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

import UserContext from './UserContext'
import Chatroom from './Chatroom'
import Register from './Register'
import Login from './Login'

const initialLoginState = {
  email: '',
  password: ''
}

const FoodSwap = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { userPostcode, setUserPostcode } = useContext(UserContext)

  const [error, setError] = useState()
  const [data, setData] = useState()
  const [form, updateForm] = useState(initialLoginState)

  console.log('yay', userPostcode)
  console.log('USERINFO:', userInfo)

  function handleSubmit() {
    axios
      .put('api/profile', data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((res) => {
        setUserInfo(res.data.user)
        console.log('foodswapdata', data)
      })
      .catch((err) => {
        setError(err.response.data.errors)
        console.log(error)
      })
  }

  function loginSubmit() {
    axios
      .post('/api/login', form, { headers: { Authorization: '' } })
      .then((resp) => {
        Auth.setToken(resp.data.token)
        console.log(resp.data.token)
        setUserInfo(resp.data)
      })
      .catch(() => setError({ errors: 'Email or Password Incorrect' }))
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  return (
    <div className="section">
      <div className="container">
        <div className="title">How things work</div>
        <div className="info">Chunk of text goes here</div>
      </div>
      <div className="container">
        {userPostcode && Auth.isAuthorized() && <Chatroom />}
        {!userPostcode && Auth.isAuthorized() && (
          <form action="" className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="" className="label">
                Enter postcode
              </label>
              <div className="control">
                <input
                  type="text"
                  name="postcode"
                  className="input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="button is-black">Enter</button>
          </form>
        )}
        {!Auth.isAuthorized() && (
          <div className="container">
            <Link className="join-link" to="/register">
              Sign Up
            </Link>
            <Link className="join-link" to="/login">
              Sign In
            </Link>
            {/* <Register />
            <Login onSubmit={loginSubmit} /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodSwap
