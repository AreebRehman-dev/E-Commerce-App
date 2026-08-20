import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Layout from '../core/Layout';
import { signup } from '../auth';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    }); // sending js object
  };

  const showError = () =>
    error ? (
      <div className='notice notice--error'>
        <ErrorOutlineIcon />
        <p>{error}</p>
      </div>
    ) : null;

  const showSuccess = () =>
    success ? (
      <div className='notice notice--success'>
        <CheckCircleIcon />
        <p>
          New account is created. Please <Link to='/signin'>Signin</Link>.
        </p>
      </div>
    ) : null;

  const signUpForm = () => (
    <div className='auth-wrap'>
      <div className='auth-card fade-in'>
        <div className='auth-head'>
          <span className='auth-badge'>
            <PersonAddIcon />
          </span>
          <h2>Sign up</h2>
        </div>

        {showSuccess()}
        {showError()}

        <form noValidate>
          <TextField
            autoComplete='off'
            onChange={handleChange('name')}
            type='text'
            name='name'
            value={name}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Full Name'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            onChange={handleChange('email')}
            type='email'
            value={email}
            autoComplete='off'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            onChange={handleChange('password')}
            value={password}
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            color='primary'
            onClick={clickSubmit}
            style={{ marginTop: 22 }}
          >
            Sign Up
          </Button>
        </form>

        <div className='auth-foot'>
          <Link to='/signin'>Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      title='Signup page'
      description='Signup to MERN E-commerce App'
      crumb='Sign up'
    >
      {signUpForm()}
    </Layout>
  );
}
