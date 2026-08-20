import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='field'>
        <label className='field-label' htmlFor='category-name'>
          Name
        </label>
        <input
          id='category-name'
          type='text'
          className='input'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn-x btn-x--primary'>
        <AddIcon />
        Create Category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <div className='notice notice--success'>
          <CheckCircleIcon />
          <p>{name} is created</p>
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className='notice notice--error'>
          <ErrorOutlineIcon />
          <p>Category should be unique</p>
        </div>
      );
    }
  };

  const goBack = () => (
    <Link to='/admin/dashboard' className='btn-x btn-x--outline'>
      <ArrowBackIcon />
      Back to Dashboard
    </Link>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Hey ${user.name}, ready to add a new category?`}
      crumb='Add category'
      actions={goBack()}
    >
      <div className='section section--sm'>
        <div className='shell shell--narrow' style={{ padding: 0 }}>
          {showSuccess()}
          {showError()}

          <div className='panel'>
            <div className='panel-head'>
              <h3>New category</h3>
            </div>
            <div className='panel-body'>{newCategoryForm()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
