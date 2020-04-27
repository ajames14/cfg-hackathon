import React, { useRef, useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'

import AboutChallenges from './Challenges'
import AboutContent from './Concept'

const About = () => {
  const [slide1, showSlide1] = useState(true)
  const [slide2, showSlide2] = useState(false)

  function changeSlide() {
    showSlide1(!slide1)
    showSlide2(!slide2)
  }

  return (
    <div className="section" id="about-section">
      <div className="container is-half">
        {slide1 && <AboutChallenges />}
        {slide2 && <AboutContent />}
        <Fade bottom delay={1500}>
          <div className="button" onClick={changeSlide}>
            {slide1 ? 'More' : 'Back'}
          </div>
        </Fade>
      </div>
    </div>
  )
}
export default About
