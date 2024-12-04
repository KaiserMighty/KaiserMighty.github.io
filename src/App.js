import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bootup from './components/Bootup';
import LowLevel from './pages/LowLevel';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/bootup' element={<Bootup />} />
      <Route path='/lowlevel' element={<LowLevel />} />
    </Routes>
  </Router>
  );
}

export default App;
