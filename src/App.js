import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import AdminPage from './Pages/AdminPage';
import { AuthProvider } from './Auth';
import LoginAdminPage from './Pages/AdminPage/Login';
import MenuPage from './Pages/MenuPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor:'#F6F8FB' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '0px', margin: "0px" }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/admin/*" element={<AdminPage />} /> 
              <Route path="/login" element={<LoginAdminPage/>} /> {/* Replace with your actual login component */}
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
