import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IntroOverlay from './IntroOverlay'
import { gsap } from 'gsap'

const Home = () => {
  return (
    <div className="section" id="home-section">
      <IntroOverlay />
      <div className="container">
        <div className="box" id="lrg-box">
          <div className="home-link" id="large-link">
            HELPING YOU CUT CROWDS & MINIMIZE WASTE
          </div>
          <div style={{ margin: '40px 0px 30px 0px' }}>
            <Link
              to="/about"
              className="small-link"
              style={{ paddingLeft: '8px', color: 'white' }}
            >
              Find out more...
            </Link>
          </div>
        </div>
      </div>
      <div className="container" id="small-container">
        <div className="box" id="small-box">
          <div className="home-link">FIND YOUR RECIPES</div>
        </div>
        <div className="box" id="small-box">
          <div className="home-link">SHARE YOUR FOOD</div>
        </div>
      </div>
    </div>
  )
}

export default Home

// CONVERT THIS TO CSS GRID?
