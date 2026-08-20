import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const ProductSkeletons = ({ count = 3 }) => (
  <div className='grid-products'>
    {Array.from({ length: count }).map((_, i) => (
      <div className='sk-card' key={i}>
        <div className='sk sk-media' />
        <div className='sk sk-line sk-line--lg' />
        <div className='sk sk-line' />
        <div className='sk sk-line sk-line--sm' />
      </div>
    ))}
  </div>
);

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  const showError = () =>
    error && error.length > 0 ? (
      <div className='section section--sm'>
        <div className='notice notice--error'>{error}</div>
      </div>
    ) : null;

  const productSection = (heading, icon, items) => (
    <section className='section'>
      <div className='section-head'>
        <h2 className='section-title'>{heading}</h2>
        {!loading && items.length > 0 && (
          <span className='chip chip--brand'>
            {icon}
            {items.length} products
          </span>
        )}
      </div>

      {loading ? (
        <ProductSkeletons />
      ) : items.length > 0 ? (
        <div className='grid-products fade-in'>
          {items.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <span className='empty-icon'>{icon}</span>
          <h3>No products to show</h3>
        </div>
      )}
    </section>
  );

  return (
    <Layout title='Home page' description='MERN E-commerce App' hero>
      <Search />

      {showError()}

      {productSection('New Arrivals', <NewReleasesIcon />, productsByArrival)}
      {productSection('Best Sellers', <WhatshotIcon />, productsBySell)}
    </Layout>
  );
};

export default Home;
