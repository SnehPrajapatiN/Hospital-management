import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar">
            <div className="nav">
                <div className='left'>
                    <h2 className='logo'>Health<span>care</span></h2>
                    <div className='navigation'>
                    </div>
                    <div className='menu-icon' onClick={toggleMenu}>
                        &#9776; {/* This is the Unicode character for the hamburger menu icon */}
                    </div>
                </div>
                {menuOpen && (
                    <div className='dropdown-menu'>
                        <div className='list'>Home</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
