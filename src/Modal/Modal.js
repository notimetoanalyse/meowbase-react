import React, { Fragment } from 'react';
import TextInput from '../components/TextInput.js';
import SuccessButton from '../components/Buttons/SuccessButton';
import CancelButton from '../components/Buttons/CancelButton';
import '.././App.css';

const Modal = props => {
  function handleFileSelect(e, output) {
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
            <div className="modal-card-body">
              <div>
                <form>
                  <div className="patient-img-upload-container">
                    <input
                      type="file"
                      id="patient-img-upload"
                      placeholder="Add Image"
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
                  <TextInput
                    labelClassName="modal-label"
                    label="Name"
                    id="name"
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
                    className="form-input textarea"
                    cols="30"
                    rows="5"
                  ></textarea>
                  <div id="empty-msg-observations" className="empty-input">
                    Observations field can't be empty or less than 2 characters
                  </div>
                  <div className="tags-container">
                    <TextInput
                      label="Tags"
                      id="input-tags"
                      labelClassName="modal-label"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-card-foot">
              <div>
                <SuccessButton
                  id="submit-patient-btn"
                  value="submit"
                  title="Submit patient"
                />
                <CancelButton
                  id="cancel-btn"
                  title="Cancel"
                  clicked={props.closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
