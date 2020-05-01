import React from 'react'
import Fade from 'react-reveal/Fade'
import Title from './Title'

const AboutContent = () => {
  return (
    <div className="info">
      <Title lineContent="Our" lineContent2="concept" />
      <Fade bottom delay={1500}>
        <p className="other">
          <span>WASTEnotWANTnot helps you to stay home, share food and waste less. We do this in two ways:</span>
          <br></br>
          <br></br>
          <span>RECIPE FINDER:</span> For when you&apos;re short on supplies and lacking inspiration. 
          Enter up to 5 key ingredients and we provide delicious recipes to use up what you have.
          <br></br>
          <br></br>
          <span>FOOD COMMUNITY: </span>Receive food when you need it and give food when you can spare it. We&apos;ve created a forum to connect you with people in your area. 
          Simply sign up to your local forum, post what you need and wait for a friendly neighbour to lend a hand. 
        </p>
      </Fade>
    </div>
  )
}

export default AboutContent
