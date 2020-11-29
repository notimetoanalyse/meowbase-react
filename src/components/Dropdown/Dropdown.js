import React, { useState } from 'react';
import caticon from '../../assets/caticon.png';
import { IoMdSettings, FiLogOut } from 'react-icons/all';
import { NavLink } from 'react-router-dom';

const dropdownMenuItemStyling = {
  display: 'flex',
  alignItems: 'center',
};

const Dropdown = props => {
  const [isOpened, setDropdownState] = useState(false);

  const toggleDropdownState = () => setDropdownState(prevState => !prevState);
  return (
    <div
      className={isOpened ? 'dropdown is-active is-right' : 'dropdown is-right'}
      onClick={toggleDropdownState}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <img src={caticon} className="dropdown-user-icon" /> &nbsp;
          <i className="fas fa-angle-down" aria-hidden="true"></i>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <NavLink
            to={`/settings`}
            onClick={() => props.changeTitle('Settings')}
          >
            <a className="dropdown-item" style={dropdownMenuItemStyling}>
              <IoMdSettings /> &nbsp; Settings
            </a>
          </NavLink>
          <a className="dropdown-item" style={dropdownMenuItemStyling}>
            <FiLogOut />
            &nbsp; Log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
