import React from 'react'
import Title from './Title'

const AboutChallenges = () => {
  return (
    <div className="section" id="about-section">
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

export default AboutChallenges
