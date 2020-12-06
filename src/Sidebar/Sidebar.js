import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import { useHistory } from 'react-router-dom';


const Sidebar = () => {
  const { logOut } = useAuth();
  const [error, setError] = useState('');
  const className = (window.location.pathname === '/' || window.location.pathname.includes('/patient/')) ? 'is-active' : '';
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
      await logOut();
      history.push('/login');
    } catch {
      setError('Failed to log out');
      alert(error);
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
