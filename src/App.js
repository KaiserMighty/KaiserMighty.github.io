import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Bootup from './components/Bootup';
import LowLevel from './pages/LowLevel';

import Hermes from './projects/Hermes';
import Perlmutter from './projects/Perlmutter';
import FileSystem from './projects/FileSystem';
import Bit32 from './projects/32Bit';
import DataProcessor from './projects/DataProcessor';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/bootup' element={<Bootup />} />
      <Route path='/lowlevel' element={<LowLevel />} />

      <Route path='/lowlevel/hermes' element={<Hermes />} />
      <Route path='/lowlevel/perlmutter' element={<Perlmutter />} />
      <Route path='/lowlevel/filesystem' element={<FileSystem />} />
      <Route path='/lowlevel/32bitcpu' element={<Bit32 />} />
      <Route path='/lowlevel/dataprocessor' element={<DataProcessor />} />

    </Routes>
  </Router>
  );
}

export default App;
