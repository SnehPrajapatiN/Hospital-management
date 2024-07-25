import React, { useState, useEffect } from 'react';
import './Patient.css';
import Card from './Card/Card';
import { useNavigate } from 'react-router-dom';

function Patient() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  const specialties = [
    'Dermatology',
    'Ophthalmology',
    'Obstetrics and Gynecology',
    'Cardiology',
    'Pulmonology',
    'Pediatrics',
    'Urology',
    'Neurology',
    'Gastroenterology',
    'Orthopedics',
    'Oncology',
    'Endocrinology',
    'Psychiatry'
  ];

  const handleChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  useEffect(() => {
    // Fetch data from the local API
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => {
        setDoctors(data);
        setFilteredDoctors(data); // Initialize filteredDoctors with fetched data
      })
      .catch(error => console.error('Error fetching data:', error));

    // Load external scripts with error handling
    const loadScript = (src, attributes = {}) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        Object.keys(attributes).forEach(key => {
          script.setAttribute(key, attributes[key]);
        });

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));

        document.body.appendChild(script);
      });
    };

    // Avoid multiple inclusions
    if (!document.querySelector(`script[src="https://www.chatbase.co/embed.min.js"]`)) {
      loadScript('https://www.chatbase.co/embed.min.js', {
        chatbotId: 'Vvu7qfqbsihjGmcSvNM-b',
        domain: 'www.chatbase.co'
      }).catch(error => console.error('Error loading script:', error));
    }

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "Vvu7qfqbsihjGmcSvNM-b",
        domain: "www.chatbase.co"
      }
    `;
    document.body.appendChild(configScript);

    return () => {
      const scriptElement = document.querySelector(`script[src="https://www.chatbase.co/embed.min.js"]`);
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      document.body.removeChild(configScript);
    };
  }, []);

  useEffect(() => {
    // Filter doctors based on selected specialty
    setFilteredDoctors(selectedSpecialty
      ? doctors.filter(doctor => doctor.specialist.toLowerCase() === selectedSpecialty.toLowerCase())
      : doctors);
  }, [doctors, selectedSpecialty]);

  const handleBookNow = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div className="App">
      <div className='navbar'>
        <h2>Search</h2>
        <form>
          <select value={selectedSpecialty} onChange={handleChange}>
            <option value="" disabled>Select a specialty</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </form>
      </div>

      <div className='doctor_section'>
        <div className='box'>
          {filteredDoctors.map(doctor => (
            <Card
              key={doctor.id}
              id={doctor.id}
              name={doctor.username}
              specialist={doctor.specialist}
              description={doctor.description}
              onBookNow={handleBookNow}  // Ensure this prop is passed correctly
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patient;
