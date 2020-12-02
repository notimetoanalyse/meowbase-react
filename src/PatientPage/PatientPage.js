import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import { usePatientsContext } from '../context/PatientsContext';
import { db } from '../firebase';

// refactor
const PatientPage = () => {
  const patientId = window.location.pathname.split('/patient/')[1];
  const [{ patients }, dispatch] = usePatientsContext();
  const [patient, setPatient] = useState();

  useEffect(() => {
    if (patients) {
      const currentPatient = patients.filter(
        patient => patient.id === patientId
      )[0];

      setPatient(currentPatient);
    }
  }, [patients]);

  const patientInfo = patient ? (
    <div class="box is-large">
      <div class="patient-page-img-container">
        <input type="file" id="patient-img-upload-personal-page" />
        <output id="patient-img-uploaded-personal-page">
          <img src={patient.image} width="150" />
        </output>
      </div>
      <form>
        <div class="patient-page-info-wrapper patient-info-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="personal-page-name-input"
            defaultValue={patient.name}
            class="form-input input"
          />
          <label for="observations">Observations</label>
          <textarea
            name="observations"
            id="personal-page-observations-input"
            class="form-input textarea"
            defaultValue={patient.observations}
          ></textarea>
          {/* <input
            type="text"
            id="patient-page-input-tags"
            class="form-input input"
          /> */}
          <div class="buttons-container">
            <button
              class="button is-success"
              id="save-patient-btn"
              data-id-personal-page={patient.id}
              value="submit"
            >
              <i class="fa fa-check" aria-hidden="true"></i> Save
            </button>
            <button
              class="button is-danger"
              id="delete-patient-btn"
              data-id-personal-page={patient.id}
            >
              <i class="fa fa-times" aria-hidden="true"></i> Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Loader />
  );

  return <div>{patientInfo}</div>;
};

export default PatientPage;
