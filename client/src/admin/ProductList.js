import React from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getProducts } from './apiAdmin';

import Inventory2Icon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ProductList = () => {
  const { user } = isAuthenticated();
  const [products, setProducts] = React.useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  React.useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Product List'
      description={`Hey ${user.name} ready to manage products?`}
      crumb='Products'
      actions={
        <Link to='/admin/dashboard' className='btn-x btn-x--outline'>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      }
    >
      <div className='section section--sm'>
        <div className='shell shell--narrow' style={{ padding: 0 }}>
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
      </div>
    </Layout>
  );
};

export default ProductList;
