// Imports react core library
import React from 'react';
// From React-router-dom library importing compinent for navigation without reloads
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// HTML5 api histort to keep user interface in sync
// Importing React components from respective files
import EditSample from './components/EditSample';
import HomeScreen from './components/HomeScreen';
import CreateSample from './components/CreateSample';
import Share from './components/Share';

// Main app component that defines the basic outline of the app
function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes> // wrapper for multiple routes for rendering components
            <Route path="/" element={<HomeScreen />} /> // each route for path specification
            <Route path="/create" element={<CreateSample />} />
            <Route path="/share/:id" element={<Share />} />
            <Route path="/edit/:id" element={<EditSample />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
