// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Users from './Users';
import Events from './Events';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';

const App = () => {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
};

export default App;
