import React from 'react';

import KeyboardIcon from '@mui/icons-material/Keyboard';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { Link } from 'react-router-dom';

import './Menu.scss';

export default function Menu() {
  const items = [
    {
      path: '/',
      text: 'Home',
      logo: <MapsHomeWorkIcon />,
    },
    {
      path: '/word',
      text: 'Word',
      logo: <KeyboardIcon />,
    },
    {
      path: '/sentence',
      text: 'Sentence',
      logo: <KeyboardIcon />,
    },
    {
      path: '/paragraph',
      text: 'Paragraph',
      logo: <KeyboardIcon />,
    },
  ];

  return (
    <div>
      <ul className="menu">
        {items.map((item) => (
          <li key={item.path} className="menu__item">
            <Link to={item.path}>
              {item.logo}
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
