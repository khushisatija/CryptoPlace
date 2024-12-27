import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home/Home"
import Coin from "./Pages/Coin/Coin"
import Footer from './Components/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css';
import About from './Pages/About/About';
import Features from './Pages/Features/Features'
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coin/:coinId" element={<Coin/>} />
        <Route path="/about" element = {<About/>} />
        <Route path="/features" element = {<Features/>}/>
      </Routes>
      <ToastContainer />
      <Footer/>
    </div>
  )
}

export default App
