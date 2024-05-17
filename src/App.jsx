import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/SideBar/SideBar'
import {Route, Routes} from 'react-router-dom'
import Agregar from './Pages/Agregar/Agregar'
import Lista from './Pages/Lista/Lista'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url = "http://localhost:5000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path="/add" element={<Agregar url={url}/>} />
          <Route path="/list" element={<Lista url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App