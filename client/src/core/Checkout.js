import React, { useState, useEffect, useCallback } from 'react';
import {
  getBraintreeClientToken,
  createOrder,
} from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

import LockIcon from '@material-ui/icons/Lock';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = useCallback((userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  }, []);

  useEffect(() => {
    getToken(userId, token);
  }, [getToken, userId, token]);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const itemCount = () =>
    products.reduce((total, product) => total + Number(product.count || 0), 0);

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link className='btn-x btn-x--primary btn-x--block' to='/signin'>
        <LockIcon />
        Sign in to checkout
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });

    const createOrderData = {
      products: products,
      amount: getTotal(products),
      address: deliveryAddress,
    };

    createOrder(userId, token, createOrderData)
      .then((response) => {
        emptyCart(() => {
          setRun(!run); // run useEffect in parent Cart
          console.log('payment success and empty cart');
          setData({
            loading: false,
            success: true,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: false });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='field'>
            <label className='field-label' htmlFor='delivery-address'>
              Delivery address
            </label>
            <textarea
              id='delivery-address'
              onChange={handleAddress}
              className='textarea'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <div className='dropin-wrap'>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: 'vault',
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
          </div>

          <button onClick={buy} type='button' className='btn-x btn-x--success btn-x--block btn-x--lg'>
            <LockIcon />
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) =>
    error ? (
      <div className='notice notice--error'>
        <ErrorOutlineIcon />
        <p>{error}</p>
      </div>
    ) : null;

  const showSuccess = (success) =>
    success ? (
      <div className='notice notice--success'>
        <CheckCircleIcon />
        <p>Thanks! Your payment was successful!</p>
      </div>
    ) : null;

  const showLoading = (loading) =>
    loading && (
      <div className='notice notice--info'>
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
      <div className='summary-row'>
        <span className='k'>Items</span>
        <span className='v'>{itemCount()}</span>
      </div>

      <div className='summary-total'>
        <span>Total:</span>
        <strong>${getTotal()}</strong>
      </div>

      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
