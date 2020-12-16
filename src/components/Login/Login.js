import React, { useRef, useState, useEffect } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { signIn, setAuthError, signOut } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../Loader/Loader";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { error, loading, currentUser } = useSelector(state => state.auth)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setAuthError(''))
  }, [])

  if (currentUser !== null) {
    return <Redirect to ='/'/>
  }

  if(loading) {
    return <Loader/>
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(signIn(emailRef.current.value, passwordRef.current.value))

      // log out user in 1 hour
      setTimeout(async () => {
        try {
          dispatch(signOut())
          history.push('/login')
        } catch (err) {
          dispatch(setAuthError(err))
        }
      }, 3600000)
       history.push('/')
    } catch (err) {
      dispatch(setAuthError(err));
    }
  }

  return (
    <section className="hero is-white is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Login</h3>
            <hr className="login-hr" />
            {error && <div className='notification is-danger'> {error} </div>}
              <p className="subtitle has-text-black">Please login to proceed.</p>
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

                <button
                  class="button is-block is-primary is-medium is-fullwidth"
                  type="submit"
                  disabled={loading}
                >
                  Login <i class="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </form>
            </div>
            <p class="has-text-grey">
              <Link to="/signup">Sign Up</Link> &nbsp;·&nbsp;
              <Link to="/forgot-password">Forgot Password</Link>&nbsp;·&nbsp;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
