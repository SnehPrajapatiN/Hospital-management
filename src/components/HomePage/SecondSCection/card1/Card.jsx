import React from 'react'
import './Card.css'
import { IoIosPerson } from "react-icons/io";

function Card() {
  return (
    <div className='card'>
        <div className='top'>
            <div className='circle'><IoIosPerson/></div>
            <span>Emergency Case</span>
        </div>
        <div className='down'>
            <p>-The best products start<br/>with Figma</p>
            <p>-The best products start<br/>with Figma</p>
            <span>Learn more</span>
        </div>
    </div>
  )
}

export default Card
