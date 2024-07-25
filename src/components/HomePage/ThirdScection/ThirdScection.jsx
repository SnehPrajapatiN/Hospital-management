import React from 'react'
import Card2 from './card2/Card2'

import './ThirdScetion.css'

function ThirdScection() {
  return (
    <div className='info'>
          <div className='content'>
            <h1>Leading medician</h1>
            <p>Problems trying to resolve the conflict between
              the two major realms of Classical physics</p>
          </div>
          <div className='card_container'>
            <Card2/>
            <Card2/>
            <Card2/>
          </div>
          
        
      </div>
  )
}

export default ThirdScection
