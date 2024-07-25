import './App.css'
import useLocoScroll from './components/LocoMotive/useLocoScroll'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Patient from './components/PatientSidePage/Patient'
import ProjectDoc from './components/ProjectDoc/ProjectDoc'
import All from './components/All/All'
import Doctor from './components/DoctorSide/Doctor';

function App() {
  useLocoScroll(true);

  return (
    <Router>
      <div className='main smooth-scroll'>
        <Routes>
          <Route path='/' element={<All/>} />
          <Route path="/doctor" element={<Patient/>} />
          <Route path="/doctor/:id" element={<ProjectDoc/>} />
          <Route path='/dashboard' element={<Doctor/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
