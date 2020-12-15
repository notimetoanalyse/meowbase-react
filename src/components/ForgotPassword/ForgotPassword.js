import React, { useRef, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import {resetPassword, setAuthError} from '../../redux/actions'
import {useDispatch, useSelector} from "react-redux";
import Loader from '../Loader/Loader'

const ForgotPassword = () => {
  const emailRef = useRef();
  const [successfulReset, setSuccessfulReset] = useState(false);
  const dispatch = useDispatch();
  const {currentUser, error, loading} = useSelector(state => state.auth)

  if (currentUser) {
    return <Redirect to='/'/>
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(resetPassword(emailRef.current.value))
      setSuccessfulReset(true)
    } catch(e) {
      dispatch(setAuthError(e));
    }
  }

  return (
    <section className="hero is-white is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Reset Password</h3>
            {error && <div className="notification is-danger">{error}</div>}
            {successfulReset &&
              <div className="notification is-info">
                Please check your email for further instructions.
              </div>}
            <hr className="login-hr" />
            <p className="subtitle has-text-black">Enter your email</p>
            <div className="box">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="email"
                      placeholder="Your Email"
                      autofocus=""
                      ref={emailRef}
                    />
                  </div>
                </div>

                <button
                  class="button is-block is-primary is-medium is-fullwidth"
                  type="submit"
                  disabled={loading}
                >
                  Reset Password{' '}
                  <i class="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </form>
            </div>
            <p class="has-text-grey">
              <Link to="/login">Back to Login</Link> &nbsp;·&nbsp;
              <Link to="/signup">Sign Up</Link>&nbsp;·&nbsp;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
