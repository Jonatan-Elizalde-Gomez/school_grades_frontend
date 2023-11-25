import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from './components/StudentList';
import SubjectList from './components/SubjectList';
import UserGrades from './components/UserGrades';

import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/students" element={<StudentList/>} />
        <Route path="/subjects" element={<SubjectList/>} />
        <Route path="/grades" element={<UserGrades/>} />
      </Routes>
    </Router>
  );
}

export default App;
