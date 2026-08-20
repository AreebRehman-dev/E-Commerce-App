import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

import { signin, authenticate, isAuthenticated } from '../auth';

export default function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () =>
    error ? (
      <div className='notice notice--error'>
        <ErrorOutlineIcon />
        <p>{error}</p>
      </div>
    ) : null;

  const showLoading = () =>
    loading && (
      <div className='notice notice--info'>
        <CircularProgress size={18} color='inherit' />
        <p>Loading...</p>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  const signInForm = () => (
    <div className='auth-wrap'>
      <div className='auth-card fade-in'>
        <div className='auth-head'>
          <span className='auth-badge'>
            <LockOutlinedIcon />
          </span>
          <h2>Sign in</h2>
        </div>

        {showError()}
        {showLoading()}
        {redirectUser()}

        <form noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={handleChange('email')}
            type='email'
            value={email}
            autoFocus
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

          <div className='auth-meta'>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' size='small' />}
              label='Remember me'
            />
            <a className='link-muted' href='#top'>
              Forgot password?
            </a>
          </div>

          <Button
            onClick={clickSubmit}
            type='submit'
            fullWidth
            size='large'
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        <div className='auth-foot'>
          <Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      title='Signin page'
      description='Signin to MERN E-commerce App'
      crumb='Sign in'
    >
      {signInForm()}
    </Layout>
  );
}
