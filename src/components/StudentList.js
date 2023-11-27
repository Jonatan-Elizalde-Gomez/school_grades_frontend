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

    return (
        <div className="container mx-auto mt-8">
          <button
            onClick={handleAdd}
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Añadir Estudiante
          </button>
    
          <button
            onClick={() => handleGoToSubjects()}
            className="ml-4 mb-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          >
            Ir a tabla de materias
          </button>
    
          <button
            onClick={() => handleGoToGrades()}
            className="ml-4 mb-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          >
            Ir a tabla de calificaciones
          </button>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Edad
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
    
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Editar
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Eliminar
                        </th>
                        {/* Puedes añadir más columnas aquí */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.age}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.email}
                          </td>
                          {/* ... Celdas de estudiantes ... */}
                          <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Editar
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <StudentModal
            showModal={showModal}
            setShowModal={closeModal}
            onSubmit={currentStudent ? updateStudent : addStudent}
            student={currentStudent}
          />
        </div>
      );
}

export default StudentList;