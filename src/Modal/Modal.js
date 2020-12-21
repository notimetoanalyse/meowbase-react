import React, {Fragment, useRef, useState} from 'react';
import CancelButton from '../components/Buttons/CancelButton';
import TagsInput from '../components/TagsInput/TagsInput'
import {ToastContainer, toast} from 'react-toastify'
import Loader from '../components/Loader/Loader'
import {addPatient, setPatientsError} from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {storage} from "../firebase";

const Modal = props => {
  const {error} = useSelector(state => state.patients)
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  let imageRef = useRef();
  let nameRef = useRef();
  let observationsRef = useRef();
  const loading = useSelector(state => state.loading)
  const [tags, setTags] = useState([]);
  //create a function that will check if name and obs have enough chars

  //need to move that
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const handleSetTags = (tags) => {
    setTags(tags);
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const notify = (msg) => toast(msg)

  const handleAddPatient = (e) => {
    let imgUrl;
    e.preventDefault();

    //handle image upload
    const error = (err) => {
      dispatch(setPatientsError(err.toString()))
    };

    // on successful upload
    const complete = async () => {
      const url = await storage.ref("images").child(file.name).getDownloadURL()
      imgUrl = url;
      const patient = {
        name: nameRef.current.value,
        observations: observationsRef.current.value,
        image: imgUrl,
        tags: tags,
        status: 'visible'
      }
      dispatch(addPatient(patient))
      notify('Patient was added successfully')
      setTimeout(() => {
        props.closeModal()
      }, 2000)
    }

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on('state_changed', null, error, complete);
  }

  return (
    <Fragment>
      <div>
        <div className="modal-background">
          <ToastContainer autoClose={2000}/>
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
            <form    onKeyPress={e => {
              if(e.key === 'Enter') {
                e.preventDefault()
              }
            }}
                     onSubmit={(e) => handleAddPatient(e)}

            >
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
                      onChange={handleChange}
                    />
                    <span id="plus-sign">+</span>
                    <output id="patient-img-uploaded">{file && <img src={URL.createObjectURL(file)} alt='Patient avatar'/>}</output>
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
                  <TagsInput removeTags={removeTags} handleSetTags={handleSetTags}tags={tags}/>
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
