import React, { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePatient, deletePatient } from '../redux/actions'

// refactor
const PatientPage = () => {
  const patientId = window.location.pathname.split('/patient/')[1];
  const { patients, error } = useSelector(state => state);
  const history = useHistory()
  const dispatch = useDispatch()
  const [patient, setPatient] = useState(null);
  let nameRef = useRef();
  let observationsRef = useRef();

  useEffect(() => {
    if (patients) {
      const currentPatient = patients.filter(
        patient => patient.id === patientId
      )[0];
      setPatient(currentPatient);
    }

    return () => setPatient(null)
  }, [patients]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePatient(patient.id, {
      name: nameRef.current.value,
      observations: observationsRef.current.value,
    }));
    history.push('/')
  }

  const deleteHandler = () => {
    dispatch(deletePatient(patient.id));
    history.push('/')
  }

  const patientInfo = patient ? (
    <div class="box is-large">
      {error && <div className='notification is-info'>Something went wrong...</div>}
      <div class="patient-page-img-container">
        <input type="file" id="patient-img-upload-personal-page" />
        <output id="patient-img-uploaded-personal-page">
          <img src={patient.image} width="150" />
        </output>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div class="patient-page-info-wrapper patient-info-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="personal-page-name-input"
            defaultValue={patient.name}
            class="form-input input"
            ref={nameRef}
          />
          <label htmlFor="observations">Observations</label>
          <textarea
            name="observations"
            id="personal-page-observations-input"
            class="form-input textarea"
            defaultValue={patient.observations}
            ref={observationsRef}
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
              onClick={deleteHandler}
            >
              <i class="fa fa-times" aria-hidden="true" ></i> Delete
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
