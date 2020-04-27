import React, { useRef } from 'react'

import Fade from 'react-reveal/Fade'
import Title from './Title'

const AboutChallenges = () => {
  return (
    <div className="info">
      <Title lineContent="Todays" lineContent2="challenges" />
      <Fade bottom delay={1500}>
        <p className="other">
          Due to COVID-19 measures, food shopping has become increasingly
          difficult. Consumers face challenges due to reduced stocks in
          supermarkets, whilst also having to deal with health anxieties
          associated with leaving the house. For the most vulnerable, leaving
          the house simply isnt an option. That's why we are here to help.
        </p>
      </Fade>
    </div>
  )
}

export default AboutChallenges
