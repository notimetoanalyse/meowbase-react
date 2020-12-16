import React from 'react';
import icon from '../assets/burger.png';
// import Dropdown from '../components/Dropdown/Dropdown';

export default function TopPanel({burgerHandler}) {
  return (
    <header className="top_panel">
      <div className="burger_container" onClick={burgerHandler}>
        <img src={icon} alt="Menu" />
      </div>
      {/* <Dropdown /> */}
    </header>
  );
}
