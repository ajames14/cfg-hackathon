import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Auth from './lib/auth'

import 'bulma'
import '../src/style.scss'

import UserContext from './components/UserContext'
import Navbar from './components/Navbar'

import Home from './components/Home'

const App = (props) => {
  const [userInfo, setUserInfo] = useState(null)
  const sharedInfo = useMemo(() => ({ userInfo, setUserInfo }), [
    userInfo,
    setUserInfo,
  ])

  useEffect(() => {
    console.log('running')
    // console.log(Auth.getToken())
    if (Auth.isAuthorized()) {
      console.log('setting user')
      axios
        .get('/api/profile', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` },
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

  console.log('user', userInfo)

  return (
    <BrowserRouter>
      <UserContext.Provider value={sharedInfo}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
