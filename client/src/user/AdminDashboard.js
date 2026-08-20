import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const adminNav = [
  { to: '/admin/categories', label: 'Category List', icon: <ListAltIcon /> },
  { to: '/create/category', label: 'Add Category', icon: <CreateNewFolderIcon /> },
  { to: '/create/product', label: 'Add Product', icon: <AddBoxIcon /> },
  { to: '/admin/orders', label: 'View Orders', icon: <ReceiptIcon /> },
  { to: '/admin/products', label: 'Manage Products', icon: <SettingsIcon /> },
];

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const initials = (name || '?').trim().charAt(0).toUpperCase();

  const adminLinks = () => {
    return (
      <div className='panel panel--sticky'>
        <div className='panel-head'>
          <h4>Admin Links</h4>
        </div>
        <nav className='sidenav'>
          {adminNav.map((item) => (
            <Link className='sidenav-link' to={item.to} key={item.to}>
              {item.icon}
              {item.label}
              <ChevronRightIcon className='arrow' />
            </Link>
          ))}
        </nav>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='panel'>
        <div className='panel-head'>
          <h3>User information</h3>
          <span className={`chip ${role === 1 ? 'chip--brand' : 'chip--off'}`}>
            <VerifiedUserIcon />
            {role === 1 ? 'Admin' : 'Registered user'}
          </span>
        </div>

        <div className='profile-card'>
          <span className='avatar-lg'>{initials}</span>
          <span>
            <span className='name'>{name}</span>
            <span className='mail'>{email}</span>
          </span>
        </div>
      </div>
    );
  };

  const shortcuts = () => (
    <div className='stat-grid'>
      {adminNav.map((item) => (
        <Link className='stat' to={item.to} key={item.to}>
          <span className='stat-icon'>{item.icon}</span>
          <span>
            <span className='stat-value' style={{ fontSize: '1rem' }}>
              {item.label}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <Layout title='Dashboard' description={`${name}`} crumb='Dashboard'>
      <div className='section section--sm'>
        <div className='dash-layout'>
          <div>{adminLinks()}</div>
          <div className='stack-lg'>
            {shortcuts()}
            {adminInfo()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
