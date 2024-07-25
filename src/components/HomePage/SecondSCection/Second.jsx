import React from 'react'
import './Second.css'
import Card from './card1/Card'

function Second() {
  return (
    <div className='info'>
          <div className='content'>
            <h1>Leading medician</h1>
            <p>Problems trying to resolve the conflict between
              the two major realms of Classical physics</p>
          </div>
          <div className='card_container'>
            <Card />
            <Card />
            <Card />
          </div>
        
      </div>
  )
}

export default Second
