import React from 'react';
import { Link } from 'react-router-dom';

export default function PatientCard(props) {
  return (
    <Link to={`/patient/${props.patient.id}`}>
      <div className="card is-medium" data-id={props.patient['id']}>
        <div className="card-content">
          <div className="media" data-id={props.patient.id}>
            <div className="media-left">
              <figure className="image" data-id={props.patient['id']}>
                <img
                  id="patient-photo-main-page"
                  src={props.patient.image}
                  alt={props.patient.name}
                />
              </figure>
            </div>
          </div>
          <div className="patient-info-container" data-id={props.patient['id']}>
            <p className="title is-6 patient-name">{props.patient.name}</p>
            <div className="content">{props.patient.observations}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
