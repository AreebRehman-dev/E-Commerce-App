import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = useCallback((userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (!data || data.error) {
        console.log((data && data.error) || 'Purchase history unavailable');
        setHistory([]);
      } else {
        setHistory(Array.isArray(data) ? data : []);
      }
    });
  }, []);

  useEffect(() => {
    init(_id, token);
  }, [init, _id, token]);

  const initials = (name || '?').trim().charAt(0).toUpperCase();

  const userLinks = () => {
    return (
      <div className='panel panel--sticky'>
        <div className='panel-head'>
          <h4>User links</h4>
        </div>
        <nav className='sidenav'>
          <Link className='sidenav-link' to='/cart'>
            <ShoppingCartIcon />
            My cart
            <ChevronRightIcon className='arrow' />
          </Link>
          <Link className='sidenav-link' to={`/profile/${_id}`}>
            <EditIcon />
            Update profile
            <ChevronRightIcon className='arrow' />
          </Link>
        </nav>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='panel'>
        <div className='panel-head'>
          <h3>User information</h3>
          <span className={`chip ${role === 1 ? 'chip--brand' : 'chip--off'}`}>
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

  const purchaseHistory = (history) => {
    return (
      <div className='panel'>
        <div className='panel-head'>
          <h3>Purchase history</h3>
          <span className='chip chip--brand'>
            <ReceiptIcon />
            {history.length} orders
          </span>
        </div>

        {history.length > 0 ? (
          <div>
            {history.map((h, i) => (
              <div key={i} className='panel-body' style={{ borderTop: i ? '1px solid var(--c-border)' : 0 }}>
                <p className='subhead'>Order {i + 1}</p>
                <ul className='order-items'>
                  {(h.products || []).map((p, j) => (
                    <li className='order-item' key={j}>
                      <span className='order-item-index'>{j + 1}</span>
                      <span className='order-item-main'>
                        <span className='order-item-name'>{p.name}</span>
                        <span className='order-item-meta'>
                          Purchased {moment(p.createdAt).fromNow()}
                        </span>
                      </span>
                      <span className='order-item-price'>${p.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className='panel-body'>
            <div className='empty' style={{ border: 0, padding: '32px 16px' }}>
              <span className='empty-icon'>
                <ReceiptIcon />
              </span>
              <h3>No purchases yet</h3>
              <Link className='btn-x btn-x--primary' to='/shop'>
                Start shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout title='Dashboard' description={`${name}`} crumb='Dashboard'>
      <div className='section section--sm'>
        <div className='dash-layout'>
          <div>{userLinks()}</div>
          <div className='stack-lg'>
            <div className='stat-grid'>
              <div className='stat'>
                <span className='stat-icon'>
                  <PersonIcon />
                </span>
                <span>
                  <span className='stat-label'>Account</span>
                  <span className='stat-value' style={{ fontSize: '1.1rem' }}>
                    {role === 1 ? 'Admin' : 'Registered user'}
                  </span>
                </span>
              </div>
              <div className='stat'>
                <span className='stat-icon stat-icon--ok'>
                  <ReceiptIcon />
                </span>
                <span>
                  <span className='stat-label'>Orders</span>
                  <span className='stat-value'>{history.length}</span>
                </span>
              </div>
            </div>

            {userInfo()}
            {purchaseHistory(history)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
