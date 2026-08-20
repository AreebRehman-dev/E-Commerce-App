import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

const UpdateProduct = ({ match }) => {
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
    error: false,
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  const initCategories = useCallback(() => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setCategories(data);
      }
    });
  }, []);

  const init = useCallback(
    (productId) => {
      getProduct(productId).then((data) => {
        if (data.error) {
          setValues((prev) => ({ ...prev, error: data.error }));
        } else {
          // populate the state
          setValues((prev) => ({
            ...prev,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            shipping: data.shipping,
            quantity: data.quantity,
            formData: new FormData(),
          }));
          // load categories
          initCategories();
        }
      });
    },
    [initCategories]
  );

  useEffect(() => {
    init(match.params.productId);
  }, [init, match.params.productId]);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then((data) => {
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
          error: false,
          redirectToProfile: true,
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
            <span>
              {values.photo && values.photo.name ? values.photo.name : 'PNG, JPG or GIF'}
            </span>
          </span>
          <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
        </label>
      </div>

      <div className='field'>
        <label className='field-label' htmlFor='update-name'>
          Name
        </label>
        <input
          id='update-name'
          onChange={handleChange('name')}
          type='text'
          className='input'
          value={name}
        />
      </div>

      <div className='field'>
        <label className='field-label' htmlFor='update-description'>
          Description
        </label>
        <textarea
          id='update-description'
          onChange={handleChange('description')}
          className='textarea'
          value={description}
        />
      </div>

      <div className='field-row'>
        <div className='field'>
          <label className='field-label' htmlFor='update-price'>
            Price
          </label>
          <input
            id='update-price'
            onChange={handleChange('price')}
            type='number'
            className='input'
            value={price}
          />
        </div>

        <div className='field'>
          <label className='field-label' htmlFor='update-quantity'>
            Quantity
          </label>
          <input
            id='update-quantity'
            onChange={handleChange('quantity')}
            type='number'
            className='input'
            value={quantity}
          />
        </div>
      </div>

      <div className='field-row'>
        <div className='field'>
          <label className='field-label' htmlFor='update-category'>
            Category
          </label>
          <select id='update-category' onChange={handleChange('category')} className='select'>
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
          <label className='field-label' htmlFor='update-shipping'>
            Shipping
          </label>
          <select id='update-shipping' onChange={handleChange('shipping')} className='select'>
            <option>Please select</option>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
      </div>

      <button className='btn-x btn-x--primary' disabled={loading}>
        <SaveIcon />
        Update Product
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
        <p>{`${createdProduct}`} is updated!</p>
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
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/' />;
      }
    }
  };

  return (
    <Layout
      title='Add a new product'
      description={`G'day ${user.name}, ready to add a new product?`}
      crumb='Update product'
      actions={
        <Link to='/admin/products' className='btn-x btn-x--outline'>
          <ArrowBackIcon />
          Manage Products
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

          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
