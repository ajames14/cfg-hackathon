import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IntroOverlay from './IntroOverlay'
import { gsap } from 'gsap'

const Home = () => {
  return (
    <div className="section" id="home-section">
      <div className="container">
        <div className="box">
          <div className="title">HELPING YOU CUT CROWDS & MINIMIZE WASTE</div>
          <Link to="/about" className="small-link">
            Find out more...
          </Link>
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
