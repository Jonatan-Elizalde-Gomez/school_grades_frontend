import React, { useState, useEffect } from 'react';

function SubjectModal({ showModal, setShowModal, onSubmit, subject, allStudents }) {
    const [name, setName] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
  
    useEffect(() => {
      if (subject) {
        setName(subject.name);
        setSelectedStudents(subject.students || []);
      }
    }, [subject]);
  
    const handleSelectStudent = (student) => {
      if (!selectedStudents.find((s) => s._id === student._id)) {
        setSelectedStudents([...selectedStudents, student]);
      }
    };
  
    const handleRemoveStudent = (studentId) => {
      setSelectedStudents(selectedStudents.filter((s) => s._id !== studentId));
    };
  
    const handleSubmit = () => {
      onSubmit({
        name,
        students: selectedStudents.map((s) => s._id),
      });
      setName('');
      setSelectedStudents([]);
      setShowModal(false);
    };
  
    const handleClose = () => {
      setName('');
      setSelectedStudents([]);
      setShowModal(false);
    };
  
    if (!showModal) {
      return null;
    }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {subject ? 'Editar materia' : 'Añadir nueva materia'}
                </h3>
                <div className="mt-2">
        <input 
          type="text" 
          placeholder="Nombre de materia"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 p-2 border w-full"
        />
        <select
          onChange={(e) => handleSelectStudent(JSON.parse(e.target.value))}
          className="mt-2 p-2 border w-full"
        >
          <option value="">Selecciona un estudiante</option>
          {allStudents.map((student) => (
            <option key={student._id} value={JSON.stringify(student)}>
              {student.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedStudents.map((student) => (
            <div key={student._id} className="flex items-center gap-2 bg-blue-200 px-2 py-1 rounded">
              {student.name}
              <button
                type="button"
                onClick={() => handleRemoveStudent(student._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-xs"
              >
                x
              </button>
            </div>
          ))}
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
              {subject ? 'Guardar cambios' : 'Añadir materia'}
            </button>
            <button 
              type="button" 
              onClick={handleClose}
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

export default SubjectModal;
