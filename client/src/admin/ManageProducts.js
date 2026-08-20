import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Inventory2Icon from '@material-ui/icons/Category';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Manage Products'
      description='Perform CRUD on products'
      crumb='Manage products'
      actions={
        <Link to='/admin/dashboard' className='btn-x btn-x--outline'>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      }
    >
      <div className='section section--sm'>
        <div className='panel'>
          <div className='panel-head'>
            <h3>Total {products.length} products</h3>
            <Link to='/create/product' className='btn-x btn-x--primary btn-x--sm'>
              <AddIcon />
              Add Product
            </Link>
          </div>

          {products.length > 0 ? (
            <ul className='rowlist'>
              {products.map((p, i) => (
                <li key={i} className='rowitem'>
                  <span className='rowitem-index'>{i + 1}</span>
                  <span className='rowitem-main'>
                    <span className='rowitem-title'>{p.name}</span>
                    <span className='rowitem-sub'>${p.price}</span>
                  </span>
                  <span className='rowitem-actions'>
                    <Link
                      to={`/admin/product/update/${p._id}`}
                      className='btn-x btn-x--outline btn-x--sm'
                    >
                      <EditIcon />
                      Update
                    </Link>
                    <button
                      type='button'
                      onClick={() => destroy(p._id)}
                      className='btn-x btn-x--danger btn-x--sm'
                    >
                      <DeleteOutlineIcon />
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className='panel-body'>
              <div className='empty' style={{ border: 0, padding: '32px 16px' }}>
                <span className='empty-icon'>
                  <Inventory2Icon />
                </span>
                <h3>No products found</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
