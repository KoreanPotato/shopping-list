import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OwnerPage from './pages/OwnerPage';
import MemberPage from './pages/MemberPage';
import Header from './components/header';
import Footer from './components/footer';

import './styles/app.css';

function App() {

  return (
    
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/list/:listId" element={<OwnerPage />} />
            <Route path="/" element={<OwnerPage />} />
            <Route path="/member" element={<MemberPage />} />
         </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
