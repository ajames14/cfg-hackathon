import React, { useRef } from 'react'

import Fade from 'react-reveal/Fade'
import Title from './Title'

const AboutChallenges = () => {
  return (
    <div className="info">
      <Title lineContent="Today's" lineContent2="challenges" />
      <Fade bottom delay={1500}>
        <p className="other">
          Due to COVID-19, food shopping has become increasingly
          difficult and in some cases dangerous. 
          Long waiting times and reduced stock means we have to be more inventive with what we have.
          For the most vulnerable, leaving the house simply isn&apos;t an option.
          <br></br>
          <br></br>
          <span>That&apos;s why we are here to help!</span>
        </p>
      </Fade>
    </div>
  )
}

export default AboutChallenges
