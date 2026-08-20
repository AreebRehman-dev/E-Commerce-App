import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <section>
        <div className='section-head' style={{ marginBottom: 20 }}>
          <h2 className='section-title'>Your cart has {`${items.length}`} items</h2>
        </div>

        <div className='cart-list'>
          {items.map((product, i) => (
            <Card
              key={i}
              product={product}
              layout='row'
              showAddToCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          ))}
        </div>
      </section>
    );
  };

  const noItemsMessage = () => (
    <div className='empty'>
      <span className='empty-icon'>
        <ShoppingCartIcon />
      </span>
      <h3>Your cart is empty.</h3>
      <Link className='btn-x btn-x--primary' to='/shop'>
        Continue shopping
        <ArrowForwardIcon />
      </Link>
    </div>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      crumb='Cart'
    >
      <div className='section'>
        <div className='cart-layout'>
          <div>{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

          <aside className='panel panel--sticky'>
            <div className='panel-head'>
              <h3>Your cart summary</h3>
            </div>
            <div className='panel-body'>
              <Checkout products={items} setRun={setRun} run={run} />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
