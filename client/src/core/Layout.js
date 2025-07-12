import React from 'react';
import Menu from './Menu';
import '../styles.css';
import { Link } from 'react-router-dom';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div id='top'>
    <Menu />
    <div className='jumbotron mt-5 mb-4'>
      <div className='jumbotron_inner'>
        <h2>{title}</h2>
        <p className='lead'>{description}</p>
        <Link className="btnnn" to="/shop">Shop now</Link>
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
