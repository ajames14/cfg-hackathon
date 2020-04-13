import React from 'react'
import ScrollMagic from 'scrollmagic'
import { Controller, Scene } from 'scrollmagic'

import apple from './images/apple.png'
import beet from './images/beet.png'
import onion from './images/onion.png'
import papaya from './images/papaya.png'
import orange from './images/orange.png'
import pom from './images/pom.png'
import tomato from './images/tomato.png'




const About = () => {


  const controller = new ScrollMagic.Controller()
	
  // const scene = new ScrollMagic.Scene({
  //   triggerElement: '#trigger-1', // starting scene, when reaching this element
  //   duration: 400 // pin the element for a total of 400px
  // })
  //   .setPin('#pinned-element1') // the element we want to pin
	
  // // Add Scene to ScrollMagic Controller
  // controller.addScene(scene)



  return <div className="section">
    <div className="container">
      <div className="section" id="trigger-1">
        <div className="card">Our aim: xxxxxxxxxxxx</div>
      </div>
      <div className="section" id="trigger-2">
        <img src={beet} style={{ left: '300px' }} className="image is-96x96" />
        <img src={apple} className="image is-1by1"  />
        <img src={onion} className="image is-1by1" />
        <img src={papaya} className="image is-1by1" />
        <img src={orange} className="image is-1by1" />
        <img src={tomato} className="image is-1by1" />
      </div>
    </div>
  </div>





}

export default About
