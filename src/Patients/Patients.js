import React, { useState, useEffect } from 'react';
import SuccessButton from '../components/Buttons/SuccessButton';
import PatientCard from './PatientCard';
import Loader from '../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Patients = () => {
  const { patients, loading, error } = useSelector(state => state.patients);
  const [isModalOpened, setModalState] = useState(false);

  const closeModal = () => {
    setModalState(false);
  };

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="notification is-danger">{error}</div>
  }

  const patientsLayout = patients ? (
    <section>
      <ToastContainer />
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
    )


  return <div>{patientsLayout}</div>;
};

export default Patients;
