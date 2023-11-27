import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectModal from "./modales/SubjectModal"; // Asegúrate de importar el componente de modal

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [allStudents, setAllStudents] = useState([]);

  const handleGoToStudents = () => {
    window.location.href = '/students'
  };

  const handleGoToGrades = () => {
    window.location.href = '/grades'
  };
  useEffect(() => {
    // Función para obtener todos los estudiantes
    const fetchAllStudents = async () => {
      const result = await axios.get("http://127.0.0.1:3001/students");
      setAllStudents(result.data);
    };

    fetchAllStudents();
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const result = await axios.get("http://127.0.0.1:3001/subjects");
    setSubjects(result.data);
  };

  const addSubject = async (subject) => {
    await axios.post("http://127.0.0.1:3001/subjects", subject);
    fetchSubjects();
  };

  const updateSubject = async (subject) => {
    await axios.put(
      `http://127.0.0.1:3001/subject-enroll/${currentSubject._id}`,
      subject
    );
    fetchSubjects();
    setCurrentSubject(null); // Restablece la materia actual después de la actualización
  };

  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentSubject(null); // Asegúrate de que no hay una materia seleccionada cuando añades una nueva
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentSubject(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:3001/subjects/${id}`);
    fetchSubjects();
  };

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Añadir Materia
      </button>

      <button
        onClick={() => handleGoToStudents()}
        className="ml-4 mb-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a tabla de estudiantes
      </button>

      <button
        onClick={() => handleGoToGrades()}
        className="ml-4 mb-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a tabla de calificaciones
      </button>
      <div className="flex flex-col">
        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Nombre de la materia
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Alumnos inscritos
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
                {/* Agrega más cabeceras de columna si es necesario */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                    {subject.students.map((subject) => (
                      <div key={subject._id}>{subject.name},</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleEdit(subject)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleDelete(subject._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                  {/* Agrega más celdas de datos si es necesario */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SubjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={currentSubject ? updateSubject : addSubject}
        subject={currentSubject}
        allStudents={allStudents}
      />
    </div>
  );
}

export default SubjectList;
