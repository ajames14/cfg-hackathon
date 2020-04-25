import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'

const formInitialReg = {
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const formInitialLog = {
  email: '',
  password: ''
}

const errorInitialState = {
  errors: ''
}

const LoginRegister = ({ props, handleModal }) => {

  const [purpose, setPurpose] = useState('login')
  const [form, updateForm] = useState(formInitialLog)
  const [error, setError] = useState(errorInitialState)

  function handleInput(e) {
    updateForm({ ...form, [e.target.name]: e.target.value })
    setError({ ...error, errors: '' })
    console.log(form)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form) return

    if (purpose === 'register') {
      axios
        .post('/api/register', form, { headers: { Authorization: '' } })
        .then(() => {
          if (error.errors === '') {
            setPurpose('login')
          }
        })
        .catch((err) => {
          setError({ errors: err.response.data })
          console.log(error)
        })
    }

    if (purpose === 'login') {
      axios
        .post('/api/login', form, { headers: { Authorization: '' } })
        .then((resp) => {
          Auth.setToken(resp.data.token)
          handleModal()
        })
        .catch(() => setError({ errors: 'Email or Password Incorrect' }))
    }
  }

  function handlePurpose() {
    console.log(purpose)
    if (purpose === 'login') {
      setPurpose('register')
      updateForm(formInitialReg)
    } else {
      setPurpose('login')
      updateForm(formInitialLog)
    }
  }

  return (
    <div className="modal is-active" id="login-register">
      {console.log(form)}
      <div className="modal-background" onClick={() => handleModal()}></div>
      <div className="modal-content">
        <div className="has-text-centered" >
          <div className="title is-size-2" style={{ fontSize: 100 }}>
            {purpose === 'login' ? 'Login' : 'Register'}
          </div>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            {purpose === 'register' && <div className="field">
              <div className="control has-icons-left">
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  name="username"
                  className="input"
                  placeholder="username"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              {error.errors.username && (
                <small className="help is-danger">{error.errors.username}</small>
              )}
            </div>}
            <div className="field">
              <div className="control has-icons-left">
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  name="email"
                  className="input"
                  placeholder="email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              {error.errors.email && (
                <small className="help is-danger">{error.errors.email}</small>
              )}
            </div>
            <div className="field">
              <div className="control has-icons-left">
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  name="password"
                  className="input"
                  placeholder="password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              {error.errors.password && (
                <small className="help is-danger">{error.errors.password}</small>
              )}
            </div>
            {purpose === 'register' && <div className="field">
              <div className="control has-icons-left">
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  name="password_confirmation"
                  className="input"
                  placeholder ="confirm password"
                />
                <span className="icon is-small is-left">
                  <i className={form.password === '' ? 'fas fa-exclamation' : (form.password === form.password_confirmation) ? 'fas fa-check' : 'fas fa-times'}></i>
                </span>
              </div>
              {error.errors && form.password_confirmation !== form.password && (
                <small className="help is-danger">
                  {error.errors.password_confirmation}
                </small>
              )}
            </div>}
            <button className="button is-black">{purpose === 'register' ? 'Register' : 'Login'}</button>
          </form>
          {purpose === 'login' ? <div className="note is-size-7">Don&apos;t have an account? <span className="change-purpose" onClick={() => handlePurpose()}>Create one here.</span></div> : <></>}
          {purpose === 'register' ? <div className="note is-size-7">Already have an account? <span className="change-purpose" onClick={() => handlePurpose()}>Login here.</span></div> : <></>}
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => handleModal()}></button>
    </div>
  )
}

export default LoginRegister
