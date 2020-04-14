import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'
import axios from 'axios'
import Auth from './lib/auth'

import 'bulma'
import '../src/styles/app.scss'

import UserContext from './components/UserContext'
import Navbar from './components/Navbar'

import Home from './components/Home'
import About from './components/About'

const App = (props) => {
  const [userInfo, setUserInfo] = useState(null)
  const sharedInfo = useMemo(() => ({ userInfo, setUserInfo }), [
    userInfo,
    setUserInfo
  ])

  useEffect(() => {
    console.log('running')
    // console.log(Auth.getToken())
    if (Auth.isAuthorized()) {
      console.log('setting user')
      axios
        .get('/api/profile', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        .then((response) => {
          setUserInfo(response.data)
          console.log('response', response.data)
        })
        .catch((error) => {
          console.log(error)
          setUserInfo(null)
          Auth.logout()
          props.history.push('/login')
        })
    } else return
  }, [])

  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  console.log('user', userInfo)

  return (
    <HashRouter>
      <UserContext.Provider value={sharedInfo}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </UserContext.Provider>
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
