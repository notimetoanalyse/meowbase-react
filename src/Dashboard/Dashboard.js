import React, {useEffect, useState} from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import Patients from '../Patients/Patients.js';
import TopPanel from '../TopPanel/TopPanel';
import Loader from '../components/Loader/Loader'
import {Route, Switch, Redirect} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPatients} from '../redux/actions'
import PatientPage from '../PatientPage/PatientPage';
import Settings from '../components/Settings/Settings';

const Dashboard = () => {
    const {currentUser, loading} = useSelector(state => state.auth);
    const {loadingPatients = loading} = useSelector(state => state.patients)
    const dispatch = useDispatch();
    const [isSidebarOpened, setSidebarState] = useState(false)

    const toggleSidebarState = () => {
        setSidebarState(prevState => !prevState)
    }

    useEffect(() => {
            let isMounted = true;
            if (isMounted)
                dispatch(fetchPatients())
            //   clean up after unmounting
            return () => {
                isMounted = false;
            }
    }, []);

    if (currentUser == null) {
        return <Redirect to='/login'/>
    }

    if (loading || loadingPatients) {
        return <Loader/>
    }

    return (
        <>
            <div className="page_container">
                <div className="main_content_flex_wrapper">
                    <Sidebar mobileOpened={isSidebarOpened}/>
                    <div className="non_sidebar_content">
                        <TopPanel burgerHandler={toggleSidebarState}/>
                        <div class="main_section" id="main-section">
                            <Switch>
                                <Route exact path="/" component={Patients}/>
                                <Route path="/patient/:id" component={PatientPage}/>
                                <Route exact path="/settings" component={Settings}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
