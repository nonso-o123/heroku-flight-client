import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Navbar from './container/Navbar';
import Main from './container/Main';
import Footer from './container/Footer';
import { useSelector } from 'react-redux';


function App() {

  const [modalOpen, setModalOpen] = useState(false)
  // const [usrAuthenticated, setUsrAuthenticated] = useState(false)

  const userInfo = useSelector(state => state.userSignin)
  const userReg = useSelector(state => state.userRegister)


  return (
    <BrowserRouter>
      <div className="grid-container">
        <Navbar modalOpen={modalOpen} setModalOpen={setModalOpen} userInfo={userInfo} userReg={userReg} />
        <Main modalOpen={modalOpen} setModalOpen={setModalOpen} userInfo={userInfo} userReg={userReg} />
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
