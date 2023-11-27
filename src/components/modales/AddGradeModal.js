import React, { useState, useEffect } from "react";
import axios from "axios";

function AddGradeModal({
  showModal,
  setShowModal,
  studentId,
  fetchGrades,
  gradeToEdit,
  onSubmit,
  edit
}) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [subjectsWithoutGrades, setSubjectsWithoutGrades] = useState([]);
    
  //Declaramos el efecto
  useEffect(() => {
    const fetchSubjectsWithoutGrades = async () => {
      const result = await axios.get(
        `http://127.0.0.1:3001/students/${studentId}/subjects-without-grades`
      );
      setSubjectsWithoutGrades(result.data);
    };

    if (showModal) {
      fetchSubjectsWithoutGrades();
      if (gradeToEdit) {
        setSelectedSubject(gradeToEdit.subject._id); // Asume que la materia es un objeto con un _id
        setGrade(gradeToEdit.grade);
      }
    }
  }, [showModal, studentId, gradeToEdit]);

  const handleSubmit = async () => {
    const numericGrade = parseFloat(grade); // Convertir la calificación a número flotante para comparar correctamente.
    if (selectedSubject && numericGrade >= 0 && numericGrade <= 10) {
      const gradeData = {
        student: studentId,
        subject: selectedSubject,
        grade: numericGrade,
      };
      if (gradeToEdit) {
        await onSubmit({ ...gradeData, _id: gradeToEdit._id }); // Pasar el _id para la actualización
      } else {
        await onSubmit(gradeData);
      }

      setShowModal(false);
    } else {
        alert("Por favor, seleccione una materia y asigne una calificación entre 0 y 10.");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                {edit ? "Actualizar" : "Añadir"} Calificación
                </h3>
                <div className="mt-2">
                  {/* Contenido del modal */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="subject"
                    >
                      Materia
                    </label>
                    <div className="inline-block relative w-full">
                      {edit ?
                        <p >{gradeToEdit.subject.name}</p>

                        :

                        <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        id="subject"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                      >   <option value="">Seleccione una materia</option>
                        
                        {subjectsWithoutGrades.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                        }
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grade"
                    >
                      Calificación
                    </label>
                    <input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="grade"
  type="number"
  placeholder="Ingrese la calificación"
  value={grade}
  onChange={(e) => setGrade(e.target.value)}
  min="0"
  max="10"
/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              {edit ? "Actualizar" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGradeModal;
