import React, { useState } from 'react'
import './HeroScetion.css'
import Signin from './SignIn/SignIn'
import Signup from './SignUp/SignUp'

function HeroSection() {
    const [showSignup, setShowSignup] = useState(true);

    const toggleForm = () => {
        setShowSignup(!showSignup);
    };

    return (
        <div className='heroSection'>
            <div className='heroMain'>
                <div className='heading'>
                    <h1 className='heading_text'>Meet the Best<br />Doctors</h1>
                    <p>We know how large objects will act,<br />but things on a small scale.</p>
                    <div></div>
                </div>
                <div className='authBox'>
                    {showSignup ? <Signup /> : <Signin />}
                    <p onClick={toggleForm} className="toggle-form">
                        {showSignup ? 'Already have an account?' : 'Don\'t have an account?'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
