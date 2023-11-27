import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGradeModal from "./modales/AddGradeModal"; // Asegúrate de importar el componente de modal

function UserGrades() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [grades, setGrades] = useState([]);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [gradeToEdit, setGradeToEdit] = useState(false);

  const handleGoToStudents = () => {
    window.location.href = "/students";
  };

  const handleGoToSubjects = () => {
    window.location.href = "/subjects";
  };

  const fetchGrades = async (userId) => {
    const result = await axios.get(
      `http://127.0.0.1:3001/filter-grades?studentId=${userId}`
    ); // Asegúrate de que esta ruta exista y sea correcta en tu backend
    setGrades(result.data);
  };

  useEffect(() => {
    // Función para obtener todos los usuarios
    const fetchUsers = async () => {
      const result = await axios.get("http://127.0.0.1:3001/students"); // Asegúrate de que esta URL es correcta
      setUsers(result.data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Función para obtener las calificaciones de un usuario específico

    if (selectedUser) {
      fetchGrades(selectedUser);
    }
  }, [selectedUser]);

  // Funciones para manejar la edición y eliminación
  const handleEdit = (grade) => {
    setGradeToEdit(true);
    setCurrentGrade(grade);
    setShowAddGradeModal(true);
  };

  const handleAdd = () => {
    setCurrentGrade(null); // Asegúrate de que no hay una materia seleccionada cuando añades una nueva
    setShowAddGradeModal(true);
  };

  const updateGrade = async (grade) => {
    await axios.put(`http://127.0.0.1:3001/grade/${currentGrade._id}`, grade);
    fetchGrades(selectedUser);
    setCurrentGrade(null); // Restablece la materia actual después de la actualización
  };

  const addGrade = async (grade) => {
    await axios.post("http://127.0.0.1:3001/grades", grade);
    fetchGrades(selectedUser);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:3001/grades/${id}`); // Asegúrate de que esta ruta exista en tu backend
    // Actualiza la lista de calificaciones después de eliminar
    fetchGrades(selectedUser);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Combobox para seleccionar usuario */}
      <select
        value={selectedUser}
        onChange={handleUserChange}
        className="mb-4 border p-2 mr-4"
      >
        <option value="">Seleccione un usuario</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      {/* Botón para abrir el modal de añadir calificación */}
      <button
        onClick={() => {
          setShowAddGradeModal(true);
          setGradeToEdit(false);
        }}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Añadir Calificación
      </button>

      <button
        onClick={() => handleGoToStudents()}
        className="ml-4 mb-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a tabla de estudiantes
      </button>

      <button
        onClick={() => handleGoToSubjects()}
        className="ml-4 mb-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a tabla de materias
      </button>

      {/* El modal de añadir calificación */}

      {showAddGradeModal && (
        <AddGradeModal
          showModal={showAddGradeModal}
          setShowModal={setShowAddGradeModal}
          studentId={selectedUser}
          onSubmit={currentGrade ? updateGrade : addGrade}
          gradeToEdit={currentGrade}
          edit={gradeToEdit}
        />
      )}

      {/* Tabla de calificaciones */}
      <div className="flex flex-col">
        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Materia
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Calificación
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Editar
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                    {grade.subject ? grade.subject.name : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                    {grade.grade}
                  </td>
                  {/* Botones editar y eliminar */}
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleEdit(grade)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleDelete(grade._id)}
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
  );
}

export default UserGrades;
