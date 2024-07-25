import React from 'react'
import './HomePage.css'
import HeroSection from './HeroSection/HeroSection'
import Second from './SecondSCection/Second'
import ThirdScection from './ThirdScection/ThirdScection'
import FAQ from './FAQScetion.jsx/FAQ'

function HomePage() {
    return (
        <div className='home'>
          
            <div className='first'>
                <div className='hero'>
                    <HeroSection/>
                </div>
            </div>
            <div className='second'>
                <div className='secondScetion'>
                     <Second/>
                </div>
            </div>
            <div className='third'>
                <div className='thirdScetion'>
                    <ThirdScection/>
                </div>
            </div>
            <div className='forth'>
                <div className='fourthScetion'>
                    <FAQ/>
                </div>
            </div>
        </div>
    )
}

export default HomePage
