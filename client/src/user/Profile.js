import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, success } = values;

  const init = useCallback(
    (userId) => {
      read(userId, token).then((data) => {
        if (data.error) {
          setValues((prev) => ({ ...prev, error: true }));
        } else {
          setValues((prev) => ({ ...prev, name: data.name, email: data.email }));
        }
      });
    },
    [token]
  );

  useEffect(() => {
    init(match.params.userId);
  }, [init, match.params.userId]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to='/user/dashboard' />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className='field'>
        <label className='field-label' htmlFor='profile-name'>
          Name
        </label>
        <input
          id='profile-name'
          type='text'
          onChange={handleChange('name')}
          className='input'
          value={name}
        />
      </div>

      <div className='field'>
        <label className='field-label' htmlFor='profile-email'>
          Email
        </label>
        <input
          id='profile-email'
          type='email'
          onChange={handleChange('email')}
          className='input'
          value={email}
        />
      </div>

      <div className='field'>
        <label className='field-label' htmlFor='profile-password'>
          Password
        </label>
        <input
          id='profile-password'
          type='password'
          onChange={handleChange('password')}
          className='input'
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className='btn-x btn-x--primary'>
        <SaveIcon />
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Profile'
      description='Update your profile'
      crumb='Profile'
      actions={
        <Link className='btn-x btn-x--outline' to='/user/dashboard'>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      }
    >
      <div className='section section--sm'>
        <div className='shell shell--narrow' style={{ padding: 0 }}>
          <div className='panel'>
            <div className='panel-head'>
              <h3>Profile update</h3>
            </div>
            <div className='panel-body'>
              {profileUpdate(name, email, password)}
              {redirectUser(success)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
