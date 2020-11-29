import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

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

const PatientPage = () => {
  const patientId = window.location.pathname.split('/patient/')[1];
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchPatients() {
      const data = await db.collection('patients').get();
      const allPatients = data.docs.map(patientSnapshot =>
        parsePatientFromSnapshot(patientSnapshot)
      );

      const filteredPatients = allPatients.filter(patient => patient !== null);

      const patient = filteredPatients.filter(
        patient => patient.id === patientId
      )[0];
      if (mounted) {
        setPatient(patient);
      }
    }
    fetchPatients();
    return () => {
      mounted = false;
    };
  }, [patientId]);

  const patientInfo =
    patient !== null ? (
      <div class="box is-large">
        <div class="patient-page-img-container">
          <input type="file" id="patient-img-upload-personal-page" />
          <output id="patient-img-uploaded-personal-page">
            <img src={patient.image} width="150" />
          </output>
        </div>
        <form>
          <div class="patient-page-info-wrapper patient-info-container">
            <label for="name">Name</label>
            <input
              type="text"
              id="personal-page-name-input"
              value={patient.name}
              class="form-input input"
            />
            <label for="observations">Observations</label>
            <textarea
              name="observations"
              id="personal-page-observations-input"
              class="form-input textarea"
            >
              {patient.observations}
            </textarea>
            <input
              type="text"
              id="patient-page-input-tags"
              class="form-input input"
            />
            <div class="buttons-container">
              <button
                class="button is-success"
                id="save-patient-btn"
                data-id-personal-page={patient.id}
                value="submit"
              >
                <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Save
              </button>
              <button
                class="button is-danger"
                id="delete-patient-btn"
                data-id-personal-page={patient.id}
              >
                {' '}
                <i class="fa fa-times" aria-hidden="true"></i> &nbsp; Delete{' '}
              </button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <h1 style={{ fontSize: '30px' }}>Loading...</h1>
    );

  return <div>{patientInfo}</div>;
};

export default PatientPage;
