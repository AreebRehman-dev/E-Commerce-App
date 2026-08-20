import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StorefrontIcon from '@material-ui/icons/Storefront';

const NotFound = () => {
  return (
    <Layout title='Error: 404' description='Page Not Found' crumb='404'>
      <div className='nf'>
        <div className='nf-code'>404</div>
        <h2>Sorry, this page does not exist!</h2>
        <p>The page you are looking for may have been moved, renamed or removed.</p>
        <div className='u-wrap-actions'>
          <Link className='btn-x btn-x--primary btn-x--lg' to='/'>
            <ArrowBackIcon />
            Back to home
          </Link>
          <Link className='btn-x btn-x--outline btn-x--lg' to='/shop'>
            <StorefrontIcon />
            Go to shop
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
