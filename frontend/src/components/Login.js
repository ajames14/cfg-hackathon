import React, { useState, useContext } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import UserContext from './UserContext'

const initialLoginState = {
  email: '',
  password: ''
}

const errorInitialState = {
  errors: ''
}

const Login = (props, checkUser) => {
  const [form, updateForm] = useState(initialLoginState)
  const [error, setError] = useState(errorInitialState)
  const { userInfo, setUserInfo } = useContext(UserContext)

  function handleInput(e) {
    updateForm({ ...form, [e.target.name]: e.target.value })
    setError({ ...error, errors: '' })
    console.log(form)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(form)
    if (!form) return
    axios
      .post('/api/login', form, { headers: { Authorization: '' } })
      .then((resp) => {
        Auth.setToken(resp.data.token)
        console.log(resp.data.token)
        checkUser()
        props.history.push('/')
      })
      .catch(() => setError({ errors: 'Email or Password Incorrect' }))
  }

  return (
    <section className="section" id="login-pg">
      <div className="container has-text-centered" style={{ paddingTop: 120 }}>
        <div className="title is-size-2-mobile" style={{ fontSize: 100 }}>
          Login
        </div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="field">
            <label htmlFor="" className="label">
              Email
            </label>
            <div className="control">
              <input
                onChange={handleInput}
                type="text"
                name="email"
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Password
            </label>
            <div className="control">
              <input
                onChange={handleInput}
                type="password"
                name="password"
                className="input"
              />
            </div>
            {error.errors && (
              <small className="help is-danger">{error.errors}</small>
            )}
          </div>
          <button className="button is-black">Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login
