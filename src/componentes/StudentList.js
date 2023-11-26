import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentModal from './modales/StudentModal'; // Asegúrate de importar el componente de modal

function StudentList() {
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
  
    const handleGoToSubjects = () => {
      window.location.href = '/subjects'
    };
  
    const handleGoToGrades = () => {
      window.location.href = '/grades'
    };
  
    useEffect(() => {
      fetchStudents();
    }, []);
  
    const fetchStudents = async () => {
      const result = await axios.get("http://127.0.0.1:3001/students");
      setStudents(result.data);
    };
  
    const addStudent = async (student) => {
      await axios.post("http://127.0.0.1:3001/students", student);
      fetchStudents();
    };
  
    const updateStudent = async (student) => {
      await axios.put(`http://127.0.0.1:3001/students/${currentStudent._id}`, student);
      fetchStudents();
      setCurrentStudent(null); // Restablece el estudiante actual después de la actualización
    };
  
    const handleEdit = (student) => {
      setCurrentStudent(student);
      setShowModal(true);
    };
  
    const handleAdd = () => {
      setCurrentStudent(null); // Asegúrate de que no hay un estudiante seleccionado cuando añades uno nuevo
      setShowModal(true);
    };
  
    const closeModal = () => {
      setCurrentStudent(null);
      setShowModal(false);
    };
  
    const handleDelete = async (id) =>{
      await axios.delete(`http://127.0.0.1:3001/students/${id}`);
      fetchStudents();
    }
}

export default StudentList;