import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebase'
import { logOut } from '../redux/actions';
import logo from '../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'


const Sidebar = () => {
  const [error, setError] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const className = (window.location.pathname === '/' || window.location.pathname.includes('/patient/')) ? 'is-active' : '';

  async function handleLogout() {
    try {
      await auth.signOut();
      dispatch(logOut());
      history.push('/login');
    } catch (err) {
      setError('Failed to log out');
    }
  }

  return (
    <aside>
      <nav>
        <div className="sidebar">
          <Link to="/">
            <div className="logo_wrapper">
              <img src={logo} alt="Meowbase" />
            </div>
          </Link>
          <div className='sidebar_links-wrapper'>
            <p className="menu-label">Data</p>
            <ul className="menu-list">
              <li id="nav-patients" key="1">
                <NavLink
                  activeClassName={className}
                  className="menu-item"
                  to="/"
                >
                  Patients
            </NavLink>
              </li>
              <li id="nav-tags">
                <NavLink
                  exact
                  to="/settings"
                  activeClassName="is-active"
                  className="menu-item"
                  key="2"
                >
                  Settings
            </NavLink>
              </li>
            </ul>
          </div>
          <button className="button is-warning is-light" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
