import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IntroOverlay from './IntroOverlay'
import { gsap } from 'gsap'

const Home = () => {
  return (
    <div className="section" id="home-section">
      <div className="container">
        <Link to="/about">
          <div className="box hvr-shrink">
            <div className="home-link">
              HELPING YOU CUT CROWDS & MINIMIZE WASTE
            </div>
            <div to="/about" className="small-link">
              Find out more...
            </div>
          </div>
        </Link>
      </div>
      <div className="container" id="small-container">
        <Link to="/recipes">
          <div className="box hvr-shrink" id="small-box">
            <div className="home-link">FIND YOUR RECIPES</div>
          </div>
        </Link>
        <Link to="/foodswap">
          <div className="box hvr-shrink" id="small-box">
            <div className="home-link">SHARE YOUR FOOD</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Home
