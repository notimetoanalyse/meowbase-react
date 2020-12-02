import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

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
          <li id="nav-patients" key="1">
            <NavLink
              activeClassName="is-active"
              exact
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
    </aside>
  );
};

export default Sidebar;
