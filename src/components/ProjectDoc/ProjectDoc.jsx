import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Project.css';
import img from '../PatientSidePage/Card/image.png';

function ProjectDoc() {
  const { id } = useParams(); // Extracting the ID parameter from the URL
  const [doctor, setDoctor] = useState(null);
  const [todayDate, setTodayDate] = useState('');
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch data from the local API
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => {
        // Find the doctor with the matching ID
        const foundDoctor = data.find(doctor => doctor.id === id);
        setDoctor(foundDoctor);
      })
      .catch(error => console.error('Error fetching data:', error));

    // Set today's date
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setTodayDate(currentDate);
  }, [id]);

  const handleTimeslotClick = (timeslot) => {
    console.log('Timeslot clicked:', timeslot);
    setSelectedTimeslot(timeslot);
  };

  const handleApplyAppointment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user ? user.uid : null;

    if (!uid) {
      console.error('User not found in local storage');
      setErrorMessage('User not found in local storage');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    const appointmentData = {
      userId: uid,
      doctorId: id,
      datetime: `${todayDate} ${selectedTimeslot}`,
    };

    try {
      const response = await fetch('http://localhost:3008/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text(); // Handle non-JSON response
      }

      if (response.ok) {
        console.log('Appointment booked successfully:', data);
        setSuccessMessage('Appointment booked successfully');
        setErrorMessage(''); // Clear any previous error message
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Clear the success message after 3 seconds
      } else {
        console.error('Error booking appointment:', data);
        setErrorMessage(data.message || 'Error booking appointment');
        setSuccessMessage(''); // Clear any previous success message
        setTimeout(() => {
          setErrorMessage('');
        }, 3000); // Clear the error message after 3 seconds
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage(error.message || 'Error booking appointment');
      setSuccessMessage(''); // Clear any previous success message
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear the error message after 3 seconds
    }
  };

  return (
    <div className='doctorPage'>
      <div className='doctor_profile'>
        <div className='card3 card4'>
          <div className='img'>
            <img src={img} alt="no_person" />
          </div>
          {doctor && (
            <>
              <div className='name'>{doctor.username}</div>
              <div className='specialist'>{doctor.specialist}</div>
              <p className='description'>
                {doctor.description}
              </p>
            </>
          )}
        </div>
      </div>
      <div className='appointment'>
        <div className='fees'>
          <div className='title'>CACHAR DIAGNOSTIC CENTER</div>
          <div className='payment'>
            <p>Doctor Fee :300.00 <b>Rupees</b></p>
            <p>Booking Charge : 49.00</p>
            <p>Pay 49.00 online, Doctor's Fee 300.00 at clinic</p>
          </div>
        </div>
        <div className='date'>
          <div className='today'>{todayDate}</div> {/* Display today's date here */}
          <div className='timeslot'>
            {['9:11', '11:1', '1:3', '3:5'].map(timeslot => (
              <div
                key={timeslot}
                className={`timeslot-item ${selectedTimeslot === timeslot ? 'green-background' : ''}`}
                onClick={() => handleTimeslotClick(timeslot)}
              >
                {timeslot}
              </div>
            ))}
          </div>
          <button className='btn' onClick={handleApplyAppointment}>Apply Appointment</button>
          {successMessage && <p className='success-message'>{successMessage}</p>}
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProjectDoc;
