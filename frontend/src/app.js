import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'
import axios from 'axios'
import Auth from './lib/auth'
import gsap from 'gsap'

import 'bulma'
import '../src/styles/app.scss'

import UserContext from './components/UserContext'
import PostcodeContext from './components/PostcodeContext'
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

  const sharedInfo = useMemo(() => ({ userInfo, setUserInfo }), [
    userInfo,
    setUserInfo
  ])

  const postcode = useMemo(() => ({ userPostcode, setUserPostcode }), [
    userPostcode,
    setUserPostcode
  ])

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

  function checkUser() {
    if (Auth.isAuthorized()) {
      // console.log('setting user')
      axios
        .get('/api/profile', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        .then((response) => {
          setUserInfo(response.data)
          setUserPostcode(response.data.postcode)
          // console.log('response', response.data)
        })
        .catch((error) => {
          // console.log(error)
          setUserInfo(null)
          Auth.logout()
          props.history.push('/login')
        })
    } else return
  }

  useEffect(() => {
    // console.log('running')
    // console.log(Auth.getToken())
    checkUser()
  }, [])

  return (
    <HashRouter>
      <UserContext.Provider value={sharedInfo}>
        <PostcodeContext.Provider value={postcode}>
          <Navbar
            handleLoginRegisterModal={handleLoginRegisterModal}
            checkUser={checkUser}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            {/* <Route exact path="/join" component={UserPage} /> */}
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} checkUser={checkUser} />}
            />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/foodswap"
              render={(props) => (
                <FoodSwap
                  props={props}
                  handleLoginRegisterModal={handleLoginRegisterModal}
                  checkUser={checkUser}
                />
              )}
            />
            <Route exact path="/recipes" component={Recipes} />
            <Route
              exact
              path="/recipe/:id"
              render={(props) => <SingleRecipe {...props} user={userInfo} />}
            />
          </Switch>
          {modal ? (
            <LoginRegister
              handleLoginRegisterModal={handleLoginRegisterModal}
              use={modalUse}
              checkUser={checkUser}
            />
          ) : (
            <></>
          )}
        </PostcodeContext.Provider>{' '}
      </UserContext.Provider>
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
