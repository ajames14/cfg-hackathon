import React from 'react'

const Home = () => {
  return (
    <div className="section" id="home-section">
      <div className="container">
        <div className="box" id="lrg-box">
          <div className="home-link" id="smaller-link">
            HELPING YOU CUT CROWDS & MINIMIZE WASTE
          </div>
          <div style={{ marginTop: 157 }}>
            <a href="#" style={{ paddingLeft: '10px', color: 'white' }}>
              Find out more...
            </a>
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
