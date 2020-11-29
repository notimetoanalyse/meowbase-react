import React, { useState, useEffect } from 'react';
import SuccessButton from '../components/Buttons/SuccessButton';
import PatientCard from './PatientCard';
import { db } from '../firebase';
import Modal from '../Modal/Modal';

function parsePatientFromSnapshot(snapshot) {
  let json = snapshot.data();

  if (typeof json['name'] !== 'string' || json['name'] === '') {
    console.info(`Invalid name on patient ${snapshot.id}`);
    return null;
  }

  if (typeof json['image'] !== 'string' || json['image'] === '') {
    console.info(`Invalid image on patient ${snapshot.id}`);
    return null;
  }

  if (typeof json['observations'] !== 'string' || json['observations'] === '') {
    console.info(`Invalid observations on patient ${snapshot.id}`);
    return null;
  }

  if (!Array.isArray(json['tags'])) {
    console.info(`Invalid tags on patient ${snapshot.id}`);
    return null;
  }

  if (json['status'] == 'invisible') {
    return null;
  }
  json['id'] = snapshot.id;
  return json;
}

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpened, setModalState] = useState(false);

  const closeModal = e => {
    setModalState(false);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchPatients() {
      const data = await db.collection('patients').get();

      const allPatients = data.docs.map(patientSnapshot =>
        parsePatientFromSnapshot(patientSnapshot)
      );

      const filteredPatients = allPatients.filter(patient => patient !== null);
      if (isMounted) setPatients(filteredPatients);
    }
    fetchPatients();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="wrapper-title-and-btn">
        <p
          className="subtitle is-4"
          style={{ whiteSpace: 'nowrap' }}
          id="current-page-text-title"
        >
          Patients
        </p>
        <div className="button-wrapper">
          <SuccessButton
            title="Add patient"
            clicked={() => setModalState(true)}
          />
        </div>
      </div>

      <div id="main-info-container">
        <div id="patients">
          {patients.map(patient => (
            <PatientCard
              patient={patient}
              key={patient.id}
              // clicked={setSelectedPatient(patient)}
            />
          ))}
        </div>
      </div>

      {isModalOpened ? (
        <Modal
          // style={{ display: isModalOpened ? 'block' : 'none' }}
          closeModal={closeModal}
        />
      ) : null}
    </section>
  );
};

export default Patients;

{
}
