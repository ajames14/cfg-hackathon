import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IntroOverlay from './IntroOverlay'
import { gsap } from 'gsap'

const Home = () => {
  return (
    <div className="section" id="home-section">
      <div className="container">
<<<<<<< HEAD
        <div className="box">
          <div className="title">HELPING YOU CUT CROWDS & MINIMIZE WASTE</div>
          <Link to="/about" className="small-link">
            Find out more...
          </Link>
        </div>
=======
        <Link to="/about">
          <div className="box hvr-shrink" id="lrg-box">
            <div className="home-link" id="large-link">
              HELPING YOU CUT CROWDS & MINIMIZE WASTE
            </div>
            <div style={{ margin: '40px 0px 30px 0px' }}>
              <div
                to="/about"
                className="small-link"
                style={{ paddingLeft: '8px', color: 'white' }}
              >
                Find out more...
              </div>
            </div>
          </div>
        </Link>
>>>>>>> development
      </div>
      <div className="container" id="small-container">
        <Link to='/recipes'>
          <div className="box hvr-shrink" id="small-box">
            <div className="home-link">FIND YOUR RECIPES</div>
          </div>
        </Link>
        <Link to='/foodswap'>
          <div className="box hvr-shrink" id="small-box">
            <div className="home-link">SHARE YOUR FOOD</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home

// CONVERT THIS TO CSS GRID?
