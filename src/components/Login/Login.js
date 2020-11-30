import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <section className="hero is-white is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-black">Login</h3>
            {error && <div className="notification is-danger">{error}</div>}
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
