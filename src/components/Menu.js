import React from 'react';

import { FaKeyboard, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Menu.scss';

export default function Menu() {
  const items = [
    {
      path: '/',
      text: 'Home',
      logo: <FaHome />,
    },
    {
      path: '/word',
      text: 'Word',
      logo: <FaKeyboard />,
    },
    {
      path: '/sentence',
      text: 'Sentence',
      logo: <FaKeyboard />,
    },
    {
      path: '/paragraph',
      text: 'Paragraph',
      logo: <FaKeyboard />,
    },
  ];

  return (
    <div>
      <ul className="menu">
        {items.map((item) => (
          <Link key={item.path} to={item.path}>
            <li className="menu__item">
              {item.logo} {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
