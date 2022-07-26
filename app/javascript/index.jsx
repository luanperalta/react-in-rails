import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Airlines from './components/Airlines/Airlines';
import Airline from './components/Airline/Airline';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<Airlines />} />
        <Route path="airlines/:slug" element={<Airline />} />
      </Route>
      <Route path="about" element={<div>About</div>} />
    </Routes>
  </Router>
);