import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

import ReceiptIcon from '@material-ui/icons/Receipt';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';

/** maps an order status onto one of the design system status tones */
const statusTone = (status) => {
  const s = String(status || '').trim().toLowerCase();
  // checked before the 'process' test below, which "not processed" also matches
  if (s === 'not processed') return 'warn';
  if (s.includes('deliver')) return 'ok';
  if (s.includes('cancel') || s.includes('fail')) return 'danger';
  if (s.includes('ship') || s.includes('process')) return 'info';
  return 'warn';
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, token } = isAuthenticated();
  const userId = user._id;

  // the api helpers swallow network/parse failures and resolve with undefined,
  // so every response has to be checked before it is read
  const loadOrders = useCallback(() => {
    listOrders(userId, token).then((data) => {
      if (!data || data.error) {
        setError((data && data.error) || 'Orders could not be loaded right now.');
        setOrders([]);
      } else {
        setError('');
        setOrders(Array.isArray(data) ? data : []);
      }
      setLoading(false);
    });
  }, [userId, token]);

  const loadStatusValues = useCallback(() => {
    getStatusValues(userId, token).then((data) => {
      if (!data || data.error) {
        console.log((data && data.error) || 'Status values unavailable');
        setStatusValues([]);
      } else {
        setStatusValues(Array.isArray(data) ? data : []);
      }
    });
  }, [userId, token]);

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, [loadOrders, loadStatusValues]);

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(userId, token, orderId, e.target.value).then((data) => {
      if (!data || data.error) {
        setError('Status update failed. Please try again.');
      } else {
        loadOrders();
      }
    });
  };

  /* ------------------------------------------------------------ summary -- */

  const totalValue = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
  const countByTone = (tone) => orders.filter((o) => statusTone(o.status) === tone).length;

  const summary = () => (
    <div className='stat-grid' style={{ marginBottom: 30 }}>
      <div className='stat'>
        <span className='stat-icon'>
          <AccountBalanceWalletIcon />
        </span>
        <span>
          <span className='stat-label'>Total value</span>
          <span className='stat-value'>${totalValue}</span>
        </span>
      </div>
      <div className='stat'>
        <span className='stat-icon stat-icon--warn'>
          <HourglassEmptyIcon />
        </span>
        <span>
          <span className='stat-label'>Not processed</span>
          <span className='stat-value'>{countByTone('warn')}</span>
        </span>
      </div>
      <div className='stat'>
        <span className='stat-icon stat-icon--ok'>
          <CheckCircleIcon />
        </span>
        <span>
          <span className='stat-label'>Delivered</span>
          <span className='stat-value'>{countByTone('ok')}</span>
        </span>
      </div>
    </div>
  );

  /* ------------------------------------------------------------- header -- */

  const showOrdersLength = () => {
    if (loading) {
      return (
        <div className='section-head'>
          <span className='sk' style={{ height: 30, width: 240 }} />
        </div>
      );
    }

    if (error) {
      return (
        <div className='notice notice--error'>
          <ErrorOutlineIcon />
          <p>{error}</p>
        </div>
      );
    }

    if (orders.length > 0) {
      return (
        <>
          <div className='section-head'>
            <h2 className='section-title'>Total orders: {orders.length}</h2>
            <span className='chip chip--brand'>
              <ReceiptIcon />
              {orders.length}
            </span>
          </div>
          {summary()}
        </>
      );
    }

    return (
      <div className='empty'>
        <span className='empty-icon'>
          <ReceiptIcon />
        </span>
        <h3>No orders</h3>
      </div>
    );
  };

  /* -------------------------------------------------------------- facts -- */

  const fact = (icon, key, value) => (
    <div className='order-fact'>
      <span className='order-fact-icon'>{icon}</span>
      <span className='order-fact-body'>
        <span className='k'>{key}</span>
        <span className='v'>{value}</span>
      </span>
    </div>
  );

  const showStatus = (o) => (
    <div className='order-status'>
      <label className='field-label' htmlFor={`status-${o._id}`}>
        Status: {o.status}
      </label>
      <select
        id={`status-${o._id}`}
        className='select'
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title='Orders'
      description={`Hey ${user.name}, you can manage all the ordes here`}
      crumb='Orders'
      actions={
        <Link to='/admin/dashboard' className='btn-x btn-x--outline'>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      }
    >
      <div className='section section--sm'>
        {showOrdersLength()}

        {orders.map((o, oIndex) => {
          const items = Array.isArray(o.products) ? o.products : [];
          const tone = statusTone(o.status);

          return (
            <article className={`panel order-card order-card--${tone}`} key={oIndex}>
              <div className='order-head'>
                <span className='order-id'>
                  <small>Order ID</small>
                  {o._id}
                </span>
                <span className='order-head-side'>
                  <span className='order-amount'>${o.amount}</span>
                  <span className={`chip chip--${tone}`}>
                    <LocalShippingIcon />
                    {o.status}
                  </span>
                </span>
              </div>

              <div className='order-grid'>
                <div className='order-facts'>
                  {fact(<DescriptionIcon />, 'Transaction ID', o.transaction_id)}
                  {fact(<PersonIcon />, 'Ordered by', (o.user && o.user.name) || '—')}
                  {fact(<ScheduleIcon />, 'Ordered on', moment(o.createdAt).fromNow())}
                  {fact(<RoomIcon />, 'Delivery address', o.address)}
                </div>
                {showStatus(o)}
              </div>

              <div className='panel-body'>
                <p className='subhead'>Total products in the order: {items.length}</p>

                <ul className='order-items'>
                  {items.map((p, pIndex) => (
                    <li className='order-item' key={pIndex}>
                      <span className='order-item-index'>{pIndex + 1}</span>
                      <span className='order-item-main'>
                        <span className='order-item-name'>{p.name}</span>
                        <span className='order-item-id'>{p._id}</span>
                      </span>
                      <span className='chip order-item-qty'>&times; {p.count}</span>
                      <span className='order-item-price'>${p.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Orders;
