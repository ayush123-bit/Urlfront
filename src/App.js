import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HashUrlForm from './components/HashUrlForm';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HashUrlForm/>} />
        {/* Add other routes here if you have additional pages */}
      </Routes>
    </Router>
  );
}

export default App;
