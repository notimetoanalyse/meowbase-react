import React from 'react';
import icon from '../assets/burger.png';
// import Dropdown from '../components/Dropdown/Dropdown';

export default function TopPanel() {
  return (
    <header className="top_panel">
      <div className="burger_container">
        <img src={icon} alt="Menu" />
      </div>
      {/* <Dropdown /> */}
    </header>
  );
}
