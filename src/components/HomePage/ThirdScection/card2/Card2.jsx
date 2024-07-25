import React from 'react'
import './Card2.css'
import { CiStar } from "react-icons/ci";
import doctor from './doctor.png'

function Card2() {
  return (
    <div className='card2'>
        <div className='rating'>
                <i><CiStar/></i>
                <i><CiStar/></i>
                <i><CiStar/></i>
                <i><CiStar/></i>
                <i><CiStar/></i>
        </div>

        <div className='review'>
            Slate helps you see how many 
            more days you need to work to 
            reach your financial goal.
        </div>

        <div className='avatar'>
            <img src={doctor} alt="doctor" />
        </div>
    </div>
  )
}

export default Card2
