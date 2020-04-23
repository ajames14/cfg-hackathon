import React from 'react'

import Title from './Title'

const AboutContent = () => {
  return (
    <div className="section" id="about-section">
      <Title lineContent="Our" lineContent2="concept" />
      <p className="other">
        Due to COVID-19 measures, food shopping has become increasingly
        difficult. Consumers face challenges due to reduced stocks in
        supermarkets, whilst also having to deal with health anxieties
        associated with leaving the house. For the most vulnerable, leaving the
        house simply isnt an option. That's why we are here to help.
      </p>
    </div>
  )
}

export default AboutContent
