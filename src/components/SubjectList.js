import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectModal from "./modales/SubjectModal";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);

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

  const closeModal = () => {
    setCurrentSubject(null);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto mt-8">
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
