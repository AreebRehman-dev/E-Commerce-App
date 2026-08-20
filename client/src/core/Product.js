import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      crumb='Product'
    >
      <div className='section'>
        {error && (
          <div className='notice notice--error'>
            <ErrorOutlineIcon />
            <p>{error}</p>
          </div>
        )}

        <div className='pdp-layout'>
          <section>
            <div className='section-head' style={{ marginBottom: 20 }}>
              <h2 className='section-title'>Product Details</h2>
            </div>

            {product && product.description ? (
              <Card product={product} showViewProductButton={false} layout='feature' />
            ) : (
              <div className='sk-card'>
                <div className='sk sk-media' />
                <div className='sk sk-line sk-line--lg' />
                <div className='sk sk-line' />
                <div className='sk sk-line sk-line--sm' />
              </div>
            )}
          </section>

          <aside>
            <div className='section-head' style={{ marginBottom: 20 }}>
              <h2 className='section-title'>Related products</h2>
            </div>

            <div className='cart-list'>
              {relatedProduct.map((p, i) => (
                <Card key={i} product={p} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
