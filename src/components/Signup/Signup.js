import React, { useRef, useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {auth} from '../../firebase'
import {signUp, setAuthError} from '../../redux/actions'
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector(state => state.auth)
  const history = useHistory();
  const dispatch = useDispatch();
  const {error} = useSelector(state => state.auth)

  useEffect(() => {
    return() => dispatch(setAuthError(''))
  }, [])

  if(currentUser) {
    history.push('/login')
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       dispatch(setAuthError('Passwords do not match'))
      return;
    }

    try {
      setAuthError('');
      dispatch(signUp(emailRef.current.value, passwordRef.current.value))
      history.push('/login');
    } catch {
      setAuthError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <section className="hero is-white is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Sign Up</h3>
            {error && <div className="notification is-danger">{error}</div>}
            <hr className="login-hr" />
            <p className="subtitle has-text-black">
              Please sign up to proceed.
            </p>
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

                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="password"
                      placeholder="Your Password"
                      ref={passwordRef}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="password"
                      placeholder="Password Confirmation"
                      ref={passwordConfirmRef}
                    />
                  </div>
                </div>

                <button
                  class="button is-block is-primary is-medium is-fullwidth"
                  type="submit"
                  disabled={loading}
                >
                  Sign Up <i class="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </form>
            </div>
            <p class="has-text-grey">
              <Link to="/login">Log In</Link> &nbsp;·&nbsp;
              <Link to="/forgot-password">Forgot Password</Link>&nbsp;·&nbsp;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
