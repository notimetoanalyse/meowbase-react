import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../App.css';

const Sidebar = () => {
  return (
    <aside>
      <div className="sidebar">
        <Link to="/">
          <div className="logo_wrapper">
            <img src={logo} alt="Meowbase" />
          </div>
        </Link>
        <p className="menu-label">Data</p>
        <ul className="menu-list">
          <li id="nav-patients" className="is-active" key="1">
            <Link to="/">Patients</Link>
          </li>
          <li id="nav-tags">
            <Link to="/settings" key="2">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
