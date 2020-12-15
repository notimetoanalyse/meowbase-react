import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { logIn, setAuthError, logOut } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { error } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const notify = (msg) => toast(msg)

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setAuthError('')
      const res = await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
      dispatch(logIn(res.user))
      setTimeout(async () => {
        try {
          auth.signOut();
          dispatch(logOut())
          history.push('/login')
        } catch (err) {
          dispatch(setAuthError(err))
        }
      }, 3600000)
      setLoading(false)
      history.push('/')
    } catch (err) {
      setLoading(false)
      dispatch(setAuthError(err.toString()));
    }
    setLoading(false);
  }

  return (
    <section className="hero is-white is-fullheight">
      <ToastContainer />
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Login</h3>
            {error && notify(error)}
            <hr className="login-hr" />
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
