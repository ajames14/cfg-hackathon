import React from 'react'

import Login from './Login'
import Register from './Register'

const UserPage = () => {
  return (
    <div className="section">
      <div className="container">
        <Register />
      </div>
      <div className="container">
        <Login />
      </div>
    </div>
  )
}

export default UserPage
