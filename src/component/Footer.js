import React from 'react';
import './Footer.scss';

function Footer() {
  const date = new Date();
  const year = date.getFullYear()
  
  return (
    <div className='Footer'>
      <small>&copy; {year} ANMINJI</small>
    </div>  
  )
}

export default Footer;