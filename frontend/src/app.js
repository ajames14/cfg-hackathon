import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'
import axios from 'axios'
import Auth from './lib/auth'
import gsap from 'gsap'

import 'bulma'
import '../src/styles/app.scss'

import UserContext from './components/UserContext'
import Navbar from './components/Navbar'

import Home from './components/Home'
import About from './components/About'
import UserPage from './components/UserPage'
import Login from './components/Login'
import Register from './components/Register'
import FoodSwap from './components/Foodswap'
import Recipes from './components/Recipes'
import SingleRecipe from './components/SingleRecipe'
import LoginRegister from './components/LoginRegister'
import Profile from './components/Profile'

const App = (props) => {
  const [userInfo, setUserInfo] = useState(null)
  const [userPostcode, setUserPostcode] = useState(null)
  const sharedInfo = useMemo(
    () => ({ userInfo, setUserInfo }, { userPostcode, setUserPostcode }),
    [userInfo, setUserInfo, userPostcode, setUserPostcode]
  )
  const [modal, setModal] = useState(false)
  const [modalUse, setModalUse] = useState('login')

  // const [dimensions, setDimensions] = useState({
  //   height: window.innerHeight,
  //   width: window.innerWidth
  // })

  // function debounce(fn, ms) {
  //   let timer
  //   return () => {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       timer = null
  //       fn.apply(this, arguments)
  //     }, ms)
  //   }
  // }

  // useEffect(() => {
  //   // prevents flashing
  //   gsap.to('body', 0, { css: { visibility: 'visible' } })
  //   const debouncedHandleResize = debounce(function handleResize() {
  //     setDimensions({
  //       height: window.innerHeight,
  //       width: window.innerWidth
  //     })
  //   }, 1000)

  //   window.addEventListener('resize', debouncedHandleResize)
  //   return () => {
  //     window.removeEventListener('resize', debouncedHandleResize)
  //   }
  // })

  function handleLoginRegisterModal(use) {
    if (!modal) {
      setModalUse(use)
    }
    setModal(!modal) 
  }

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
          setUserPostcode(response.data.postcode)
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

  // console.log('app.js user', userInfo)
  // console.log('app.js postcode', userPostcode)

  return (
    <HashRouter>
      <UserContext.Provider value={sharedInfo}>
        <Navbar handleLoginRegisterModal={handleLoginRegisterModal} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          {/* <Route exact path="/join" component={UserPage} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/foodswap" render={(props) => <FoodSwap props={props} handleLoginRegisterModal={handleLoginRegisterModal}/>} />
          <Route exact path="/recipes" component={Recipes} />
          <Route
            exact
            path="/recipe/:id"
            render={(props) => <SingleRecipe {...props} user={userInfo} />}
          />
        </Switch>
      </UserContext.Provider>
      {modal ? <LoginRegister handleLoginRegisterModal={handleLoginRegisterModal} use={modalUse} /> : <></> }
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
