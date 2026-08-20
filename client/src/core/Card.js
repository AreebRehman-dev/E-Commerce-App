import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import toast from 'react-hot-toast';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
  layout = 'grid', // 'grid' | 'row' | 'feature'
}) => {
  const [, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link className='btn-x btn-x--outline' to={`/product/${product._id}`}>
          <VisibilityIcon />
          View Product
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
    toast.success('Product added to cart');
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button type='button' onClick={addToCart} className='btn-x btn-x--primary'>
          <AddShoppingCartIcon />
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='chip chip--ok chip--solid'>
        <CheckCircleIcon />
        In Stock
      </span>
    ) : (
      <span className='chip chip--off chip--solid'>
        <RemoveShoppingCartIcon />
        Out of Stock
      </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='pcard-qty'>
          <label htmlFor={`qty-${product._id}`}>Adjust Quantity</label>
          <input
            id={`qty-${product._id}`}
            type='number'
            min='1'
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          type='button'
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className='btn-x btn-x--danger'
        >
          <DeleteOutlineIcon />
          Remove Product
        </button>
      )
    );
  };

  const hasActions =
    showViewProductButton || showAddToCartButton || showRemoveProductButton;

  return (
    <article
      className={`pcard${layout === 'row' ? ' pcard--row' : ''}${
        layout === 'feature' ? ' pcard--row pcard--feature' : ''
      }`}
    >
      <Link className='pcard-media' to={`/product/${product._id}`}>
        <span className='pcard-flags'>{showStock(product.quantity)}</span>
        <ShowImage item={product} url='product' />
      </Link>

      <div className='pcard-body'>
        {product.category && product.category.name && (
          <span className='pcard-eyebrow'>{product.category.name}</span>
        )}

        <h3 className='pcard-title'>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>

        <p className='pcard-desc'>{product.description.substring(0, 100)}</p>

        <div className='pcard-priceline'>
          <span className='pcard-price'>${product.price}</span>
          <span className='pcard-date'>Added {moment(product.createdAt).fromNow()}</span>
        </div>

        {showCartUpdateOptions(cartUpdate)}

        {hasActions && (
          <div className='pcard-actions'>
            {showViewButton(showViewProductButton)}
            {showAddToCartBtn(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
          </div>
        )}
      </div>
    </article>
  );
};

export default Card;
