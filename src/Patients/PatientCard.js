import React from 'react';
import { Link } from 'react-router-dom';

export default function PatientCard({patient}) {

  const tags = patient.tags ? patient.tags.map(tag => <span className="tag is-medium"
                                             style={{backgroundColor: 'teal', color: 'white'}}>{tag}</span>) : null
  return (
    <Link to={`/patient/${patient.id}`}>
      <div className="card is-medium">
        <div className="card-content">
          <div className="media" data-id={patient.id}>
            <div className="media-left">
              <figure className="image">
                <img
                  id="patient-photo-main-page"
                  src={patient.image}
                  alt={patient.name}
                />
              </figure>
            </div>
          </div>
          <div className="patient-info-container" data-id={patient.id}>
            <p className="title is-6 patient-name">{patient.name}</p>
            <div className="content">{patient.observations}</div>
            <div className="content">{tags}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
