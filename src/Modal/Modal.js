import React, { Fragment, useRef } from 'react';
import TextInput from '../components/TextInput.js';
import SuccessButton from '../components/Buttons/SuccessButton';
import CancelButton from '../components/Buttons/CancelButton';
import Loader from '../components/Loader/Loader'
import { addPatient } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import '.././App.css';

const Modal = props => {
  const error = useSelector(state => state.patients.error)
  const dispatch = useDispatch();
  let imageRef = useRef();
  let nameRef = useRef();
  let observationsRef = useRef();
  const loading = useSelector(state => state.loading)

  function handleFileSelect(e) {
    const outputEl = document.querySelector('#patient-img-uploaded');
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (image => {
      return e => {
        outputEl.innerHTML = [
          '<img id="uploaded-image" src = "',
          e.target.result,
          '" title="',
          image.name,
          '" width="150" />',
        ].join('');
      };
    })(file);
    reader.readAsDataURL(file);
  }

  const handleAddPatient = (e) => {
    console.log('here')
    e.preventDefault();
    const patient = {
      name: nameRef.current.value,
      observations: observationsRef.current.value,
      // will need refactoring
      // image: imageRef.current.value,
      status: 'visible'
    }
    dispatch(addPatient(patient))
  }

  return (
    <Fragment>
      <div>
        <div className="modal-background">
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title">Add Patient</p>
              <button
                className="delete"
                id="close"
                aria-label="close"
                onClick={props.closeModal}
              ></button>
            </div>
            <form onSubmit={(e) => handleAddPatient(e)}>
              <div className="modal-card-body">
                {error.length > 0 && <div className='notification is-danger'>{error}</div>}
                {loading && <Loader />}
                <div>
                  <div className="patient-img-upload-container">
                    <input
                      type="file"
                      id="patient-img-upload"
                      placeholder="Add Image"
                      required
                      ref={imageRef}
                      onChange={e => handleFileSelect(e)}
                    />
                    <span id="plus-sign">+</span>
                    <output id="patient-img-uploaded"></output>
                  </div>
                  <div id="progress-container">
                    <span id="upload-photo-text">Upload progress:</span>
                    <progress
                      className="progress is-medium"
                      value="0"
                      max="100"
                      id="uploader"
                    >
                      0%
                    </progress>
                  </div>
                  <div id="empty-msg-image" className="empty-input">
                    Image can't be blank
                  </div>
                  <label htmlFor='name' className='modal-label'>Name</label>
                  <input
                    className="form-input input"
                    type="text"
                    id="name"
                    required
                    ref={nameRef}
                    placeholder="Name"
                  />
                  <div id="empty-msg-name" className="empty-input">
                    Name field can't be empty or less than 2 characters
                  </div>
                  <label htmlFor="observations" class="modal-label">
                    Observations
                  </label>
                  <textarea
                    name="observations"
                    id="observations"
                    placeholder="Observations"
                    required
                    ref={observationsRef}
                    className="form-input textarea"
                    cols="30"
                    rows="5"
                  ></textarea>
                  <div id="empty-msg-observations" className="empty-input">
                    Observations field can't be empty or less than 2 characters
                  </div>
                </div>
              </div>
              <div className="modal-card-foot">
                <div>
                  <button
                    id="submit-patient-btn"
                    value='submit'
                    className='button is-primary'
                  >Submit</button>
                  <CancelButton
                    id="cancel-btn"
                    title="Cancel"
                    clicked={props.closeModal}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
