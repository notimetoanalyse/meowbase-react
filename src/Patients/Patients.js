import React, { useState } from 'react';
import SuccessButton from '../components/Buttons/SuccessButton';
import PatientCard from './PatientCard';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import Loader from '../components/Loader/Loader';

const Patients = () => {
  const patients = useSelector(state => state.patients);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error)
  const [isModalOpened, setModalState] = useState(false);
  const dispatch = useDispatch();

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
