import React, { useState, useEffect, useContext } from 'react';
import { usePatientsContext } from '../context/PatientsContext';
import SuccessButton from '../components/Buttons/SuccessButton';
import PatientCard from './PatientCard';
import { db } from '../firebase';
import Modal from '../Modal/Modal';
import Loader from '../components/Loader/Loader';

const Patients = () => {
  const [{ patients }, dispatch] = usePatientsContext();
  const [isModalOpened, setModalState] = useState(false);

  const closeModal = () => {
    setModalState(false);
  };

  const patientsLayout = patients ? (
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
  ) : (
    <Loader />
  );

  return <div>{patientsLayout}</div>;
};

export default Patients;
