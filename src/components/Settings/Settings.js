import React, {useRef, useState} from 'react';
import {updateUserCreds} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {updateEmail, updatePassword, setAuthError, showAuthLoader, hideAuthLoader} from '../../redux/actions'
import {Link, useHistory} from 'react-router-dom';
import Loader from '../Loader/Loader'

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, error, loading} = useSelector(state => state.auth)
    const history = useHistory();
    const [successfulUpdate, setSuccessfulUpdate] = useState('')
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();

        dispatch(showAuthLoader())
        if (emailRef.current.value !== currentUser.email) {
            dispatch(updateEmail(emailRef.current.value))
            setSuccessfulUpdate('Your data was updated successfully')
        }
        if (passwordRef.current.value) {
            dispatch(updatePassword(passwordRef.current.value))
            setSuccessfulUpdate('Your data was updated successfully')
        }
        dispatch(hideAuthLoader())
    }


return (
    <>
        <div className="container has-text-centered is-fullwidth">
            <div className="column">
                <h3 className="subtitle is-4">Update Your Credentials</h3>
                {error && <div className="notification is-danger">{error}</div>}
                {loading && <Loader/>}
                {successfulUpdate.length > 0 && <div className="notification is-success">Your data was updated successfully!</div>}
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
    </>)
};



export default UpdateProfile;
