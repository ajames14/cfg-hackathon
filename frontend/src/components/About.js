import React, { useRef, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Title from './Title'
import AboutChallenges from './Challenges'
import AboutContent from './Concept'

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(AboutChallenges)
  const [visibleSlide2, showVisibleSlide2] = useState(false)

  const slide1 = AboutChallenges
  const slide2 = AboutContent
  const Components = [AboutChallenges, AboutContent]

  function nextSlide() {
    setCurrentSlide(slide2)
    showVisibleSlide2(true)
    console.log(currentSlide)
    console.log(showVisibleSlide2)
  }

  function prevSlide() {
    setCurrentSlide(slide1)
    console.log(currentSlide)
  }

  console.log(currentSlide)

  return (
    <div className="section" id="about-section">
      <div className="container">
        {/* {Components.map((Component, i) => {
          return <Component key={i} />
        })} */}
        {currentSlide === slide2 ? <AboutContent /> : <AboutChallenges />}
        <button onClick={nextSlide}>More</button>
        <button onClick={prevSlide}>Back</button>
      </div>
    </div>
  )
}

export default About
