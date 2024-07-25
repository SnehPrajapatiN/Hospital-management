import React from 'react'
import './Doctor.css'
import img from '../PatientSidePage/Card/image.png'

function Doctor() {
    return (
        <div className='dashboard'>
            <div className='left'>
                <div className='card3 card5'>
                    <div className='img'>
                        <img src={img} alt="no_person" />
                    </div>
                    <div className='name'>name</div>
                    <div className='specialist'>gudhjbuj</div>
                    <p className='description'>
                        dduehyu
                    </p>
                </div>
            </div>
            <div className='right'>
                    <div className='app_title'>Appoinments</div>
                    <div className='total'>
                        <div className=''>
                            
                        </div>
                    </div>
            </div>


        </div>
    )
}

export default Doctor
