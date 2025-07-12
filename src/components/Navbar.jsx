import React from 'react';

export default function Navbar({ sections, activeSection }) {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
      <ul className="flex bg-white/70 backdrop-blur-md rounded-full shadow-lg px-8 py-2 space-x-8 items-center">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`relative px-4 py-2 text-lg font-medium transition-colors duration-200
                ${activeSection === id
                  ? 'bg-gray-100 text-black rounded-full shadow font-semibold'
                  : 'text-gray-500 hover:text-black'}
              `}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 