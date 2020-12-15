import React, { useRef, useState } from 'react';
import { updateUserCreds } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser } = useSelector(state => state.auth)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Passwords do not match');
      }

      if (passwordRef.current.value) {
        await currentUser.updatePassword(passwordRef.current.value);
        dispatch(updateUserCreds(currentUser))
      }

      if (emailRef.current.value !== currentUser.email) {
        await currentUser.updateEmail(emailRef.current.value)
        dispatch(updateUserCreds(currentUser))
      }
      alert('data updated!')
    } catch (err) {
      setError(err)
    }
  }


  return (
    <>
      {/* <section className="hero is-white is-fullheight">
        <div className="hero-body"> */}
      <div className="container has-text-centered is-fullwidth">
        <div className="column">
          <h3 className="subtitle is-4">Update Your Credentials</h3>
          {error && <div className="notification is-danger">{error}</div>}
          <div className="box">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    type="email"
                    placeholder="Your email"
                    autofocus=""
                    required
                    ref={emailRef}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    type="password"
                    placeholder="New Password"
                    ref={passwordRef}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    type="password"
                    placeholder="Confirm New Password"
                    ref={passwordConfirmRef}
                  />
                </div>
              </div>

              <button
                class="button is-block is-primary is-medium is-fullwidth"
                type="submit"
                disabled={loading}
              >
                Submit Changes
                <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <Link to="/">Return to Dashboard</Link>
          </p>
        </div>
      </div>
      {/* </div>
      </section > */}
    </>
  );
}


export default UpdateProfile;
