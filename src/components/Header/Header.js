import React from 'react';
import './Header.css';

export const Header = ({ text, logo }) => {
  return (
    <>
      <h1 className='title'>
        {text}
      </h1>
    </>
  );
};
