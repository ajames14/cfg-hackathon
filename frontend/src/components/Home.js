import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="section" id="home-section">
      <div className="container">
        <div className="box" id="lrg-box">
          <div className="home-link" id="smaller-link">
            HELPING YOU CUT CROWDS & MINIMIZE WASTE
          </div>
          <div style={{ margin: '60px 0px 30px 0px' }}>
            <Link to="/about" style={{ paddingLeft: '8px', color: 'white' }}>
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
