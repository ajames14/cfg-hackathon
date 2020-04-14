import React, { useRef, useEffect } from 'react'
import ScrollMagic from 'scrollmagic'
import { Controller, Scene } from 'scrollmagic'
import { Tween, TimelineMax, Timeline } from 'react-gsap'
import styled from 'styled-components'

import apple from './images/apple.png'
import beet from './images/beet.png'
import onion from './images/onion.png'
import papaya from './images/papaya.png'
import orange from './images/orange.png'
import tomato from './images/tomato.png'

const About = () => {
  const controller = new ScrollMagic.Controller()

  // const scene = new ScrollMagic.Scene({
  //   triggerElement: '#trigger-2', // starting scene, when reaching this element
  //   duration: 400 // pin the element for a total of 400px
  // })
  // // .setPin('#pinned-element1') // the element we want to pin

  // // Add Scene to ScrollMagic Controller
  // controller.addScene(scene)

  let appleImg = useRef(null)
  let beetImg = useRef(null)
  let onionImg = useRef(null)
  let papayaImg = useRef(null)
  let orangeImg = useRef(null)
  let tomatoImg = useRef(null)

  useEffect(() => {
    console.log(appleImg, beetImg, onionImg, papayaImg, orangeImg, tomatoImg)
  }, [])

  return (
    <div className="section">
      <div className="trigger1">
        <Timeline
          target={
            <div className="section">
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
          <Tween to={{ fontSize: 100 }} />
        </Timeline>
      </div>
      <div className="section" id="trigger-2">
        <div className="image-wrapper">
          <Timeline
            target={
              <div className="section">
                <div className="food-img layer-1">
                  <img
                    src={onion}
                    ref={(el) => (onionImg = el)}
                    className="image is-128x128"
                  />
                  <img
                    src={beet}
                    ref={(el) => (beetImg = el)}
                    className="image is-128x128"
                  />
                  <img
                    src={apple}
                    ref={(el) => (appleImg = el)}
                    className="image is-128x128"
                  />
                </div>
              </div>
            }
          >
            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            <Tween from={{ x: '100px', rotation: -360 }} />
            {/* <Tween to={{ x: '50px' }} /> */}
          </Timeline>
          <div className="food-img layer-2">
            <img
              src={papaya}
              ref={(el) => (papayaImg = el)}
              className="image is-128x128"
            />
            <img
              src={orange}
              ref={(el) => (orangeImg = el)}
              className="image is-128x128"
            />
            <img
              src={tomato}
              ref={(el) => (tomatoImg = el)}
              className="image is-128x128"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
