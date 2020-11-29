import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Dropdown from '../components/Dropdown/Dropdown';

export default function TopPanel() {
  return (
    <header className="top_panel">
      <Dropdown />
    </header>
  );
}
