import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  // load categories and set form data
  const init = useCallback(() => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          categories: data,
          formData: new FormData(),
        }));
      }
    });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='field'>
        <span className='field-label'>Post Photo</span>
        <label className='filedrop'>
          <span className='filedrop-icon'>
            <PhotoCameraIcon />
          </span>
          <span className='filedrop-text'>
            <strong>Choose an image</strong>
            <span>{photo && photo.name ? photo.name : 'PNG, JPG or GIF'}</span>
          </span>
          <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
        </label>
      </div>

      <div className='field'>
        <label className='field-label' htmlFor='product-name'>
          Name
        </label>
        <input
          id='product-name'
          onChange={handleChange('name')}
          type='text'
          className='input'
          value={name}
        />
      </div>

      <div className='field'>
        <label className='field-label' htmlFor='product-description'>
          Description
        </label>
        <textarea
          id='product-description'
          onChange={handleChange('description')}
          className='textarea'
          value={description}
        />
      </div>

      <div className='field-row'>
        <div className='field'>
          <label className='field-label' htmlFor='product-price'>
            Price
          </label>
          <input
            id='product-price'
            onChange={handleChange('price')}
            type='number'
            className='input'
            value={price}
          />
        </div>

        <div className='field'>
          <label className='field-label' htmlFor='product-quantity'>
            Quantity
          </label>
          <input
            id='product-quantity'
            onChange={handleChange('quantity')}
            type='number'
            className='input'
            value={quantity}
          />
        </div>
      </div>

      <div className='field-row'>
        <div className='field'>
          <label className='field-label' htmlFor='product-category'>
            Category
          </label>
          <select
            id='product-category'
            onChange={handleChange('category')}
            className='select'
          >
            <option>Please select</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className='field'>
          <label className='field-label' htmlFor='product-shipping'>
            Shipping
          </label>
          <select
            id='product-shipping'
            onChange={handleChange('shipping')}
            className='select'
          >
            <option>Please select</option>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
      </div>

      <button className='btn-x btn-x--primary' disabled={loading}>
        <AddIcon />
        Create Product
      </button>
    </form>
  );

  const showError = () =>
    error ? (
      <div className='notice notice--error'>
        <ErrorOutlineIcon />
        <p>{error}</p>
      </div>
    ) : null;

  const showSuccess = () =>
    createdProduct ? (
      <div className='notice notice--success'>
        <CheckCircleIcon />
        <p>{`${createdProduct}`} is created!</p>
      </div>
    ) : null;

  const showLoading = () =>
    loading && (
      <div className='notice notice--info'>
        <CircularProgress size={18} color='inherit' />
        <p>Loading...</p>
      </div>
    );

  return (
    <Layout
      title='Add a new product'
      description={`Hey ${user.name}, ready to add a new product?`}
      crumb='Add product'
      actions={
        <Link to='/admin/dashboard' className='btn-x btn-x--outline'>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      }
    >
      <div className='section section--sm'>
        <div className='shell shell--narrow' style={{ padding: 0 }}>
          {showLoading()}
          {showSuccess()}
          {showError()}

          <div className='panel'>
            <div className='panel-head'>
              <h3>Product details</h3>
            </div>
            <div className='panel-body'>{newPostForm()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
