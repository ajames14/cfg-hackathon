import React, { useRef, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Title from './Title'

const About = () => {
  return (
    <div className="section">
      <div className="container">
        <Title lineContent="Todays" lineContent2="challenges" />
        <p className="other">
          Due to COVID-19 measures, food shopping has become increasingly
          difficult. Consumers face challenges due to reduced stocks in
          supermarkets, whilst also having to deal with health anxieties
          associated with leaving the house. For the most vulnerable, leaving
          the house simply isnt an option. That's why we are here to help.
        </p>
      </div>
    </div>
  )
}

export default About
