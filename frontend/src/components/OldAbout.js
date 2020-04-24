import React, { useRef, useEffect, useState } from 'react'
import ScrollMagic from 'scrollmagic'
import { Controller, Scene } from 'scrollmagic'
import { Tween, TimelineMax, Timeline } from 'react-gsap'
import { useSpring, animated } from 'react-spring'

import apple from './images/apple.png'
import beet from './images/beet.png'
import onion from './images/onion.png'
import papaya from './images/papaya.png'
import orange from './images/orange.png'
import tomato from './images/tomato.png'

const About = () => {
  const controller = new ScrollMagic.Controller()
  const [lastYPos, setLastYPos] = useState(0)
  const [shouldShowActions, setShouldShowActions] = useState(false)

  var appleImg = useRef(null)
  var beetImg = useRef(null)
  var onionImg = useRef(null)
  var papayaImg = useRef(null)
  var orangeImg = useRef(null)
  var tomatoImg = useRef(null)

  useEffect(() => {
    console.log(appleImg, beetImg, onionImg, papayaImg, orangeImg, tomatoImg)

    function handleScroll(appleImg) {
      console.log('scrolled')
      const yPos = window.scrollY
      const isScrollingUp = yPos < lastYPos

      setShouldShowActions(isScrollingUp)
      setLastYPos(yPos)
      console.log(yPos)
      console.log(lastYPos)
      // 114 is the bottom yScroll atm
      appleImg.classList.add('move-apple')
    }

    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [lastYPos])

  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <div className="section">
      <Timeline
        target={
          <div className="section" id="title">
            <div className="line">
              Our aim is to help reduce waste and unnecessary trips,
            </div>
            <div className="line">
              {' '}
              whilst encouraging community care and sharing
            </div>
          </div>
        }
      >
        <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
        <Tween to={{ fontSize: 80 }} />
      </Timeline>
      <div className="section" id="trigger-2">
        <Timeline
          target={
            <div className="food-img layer-1">
              <img
                src={onion}
                ref={(el) => (onionImg = el)}
                className="image is-128x128"
              />
            </div>
          }
        >
          <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
          <Tween from={{ x: '100px' }} />
          <Tween delay="4" />
        </Timeline>

        <animated.div className="food-img layer-2" style={props}>
          <img
            src={beet}
            ref={(el) => (beetImg = el)}
            className="image is-128x128"
          />
        </animated.div>
        <div className="food-img layer-3">
          <img
            src={apple}
            ref={(el) => (appleImg = el)}
            className="image is-128x128"
          />
        </div>
        <div className="food-img layer-4">
          <img
            src={papaya}
            ref={(el) => (papayaImg = el)}
            className="image is-128x128"
          />
        </div>
        <div className="food-img layer-5">
          <img
            src={orange}
            ref={(el) => (orangeImg = el)}
            className="image is-128x128"
          />
        </div>
        <div className="food-img layer-6">
          <img
            src={tomato}
            ref={(el) => (tomatoImg = el)}
            className="image is-128x128"
          />
        </div>
      </div>
    </div>
  )
}

export default About
