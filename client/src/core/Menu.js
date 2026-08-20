import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreIcon from '@material-ui/icons/Store';

const isActive = (history, path) => (history.location.pathname === path ? ' is-active' : '');

const MaterialAppBar = ({ history }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  const handleSignout = () => {
    closeDrawer();
    signout(() => {
      history.push('/');
    });
  };

  const count = itemTotal();

  const cartBadge = () =>
    count > 0 ? <span className='nav-count'>{count > 99 ? '99+' : count}</span> : null;

  /* ------------------------------------------------------------ desktop -- */

  const desktopLinks = () => (
    <nav className='nav-links' aria-label='Main navigation'>
      <Link className={`nav-link${isActive(history, '/')}`} to='/'>
        <HomeIcon />
        Home
      </Link>

      <Link className={`nav-link${isActive(history, '/shop')}`} to='/shop'>
        <StorefrontIcon />
        Shop
      </Link>

      <Link className={`nav-link nav-cart${isActive(history, '/cart')}`} to='/cart'>
        <ShoppingCartIcon />
        Cart
        {cartBadge()}
      </Link>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Link
          className={`nav-link${isActive(history, '/user/dashboard')}`}
          to='/user/dashboard'
        >
          <DashboardIcon />
          Dashboard
        </Link>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Link
          className={`nav-link${isActive(history, '/admin/dashboard')}`}
          to='/admin/dashboard'
        >
          <DashboardIcon />
          Dashboard
        </Link>
      )}

      <span className='nav-divider' />

      {!isAuthenticated() && (
        <Fragment>
          <Link className={`nav-link${isActive(history, '/signin')}`} to='/signin'>
            <AccountCircleIcon />
            Signin
          </Link>

          <Link className='btn-x btn-x--primary btn-x--sm' to='/signup'>
            <PersonAddIcon />
            Signup
          </Link>
        </Fragment>
      )}

      {isAuthenticated() && (
        <button type='button' className='nav-link' onClick={handleSignout}>
          <ExitToAppIcon />
          Signout
        </button>
      )}
    </nav>
  );

  /* ------------------------------------------------------------- mobile -- */

  const mobileDrawer = () => (
    <Drawer anchor='right' open={drawerOpen} onClose={closeDrawer}>
      <div className='drawer-panel' role='presentation'>
        <div className='drawer-head'>
          <span className='brand'>
            <span className='brand-mark'>
              <StoreIcon />
            </span>
            BRAND
          </span>
          <IconButton aria-label='Close menu' onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </div>

        <nav className='drawer-links' aria-label='Mobile navigation'>
          <Link className={`drawer-link${isActive(history, '/')}`} to='/' onClick={closeDrawer}>
            <HomeIcon />
            Home
          </Link>

          <Link
            className={`drawer-link${isActive(history, '/shop')}`}
            to='/shop'
            onClick={closeDrawer}
          >
            <StorefrontIcon />
            Shop
          </Link>

          <Link
            className={`drawer-link${isActive(history, '/cart')}`}
            to='/cart'
            onClick={closeDrawer}
          >
            <ShoppingCartIcon />
            Cart
            {count > 0 && (
              <span className='chip chip--brand' style={{ marginLeft: 'auto' }}>
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Link
              className={`drawer-link${isActive(history, '/user/dashboard')}`}
              to='/user/dashboard'
              onClick={closeDrawer}
            >
              <DashboardIcon />
              Dashboard
            </Link>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link
              className={`drawer-link${isActive(history, '/admin/dashboard')}`}
              to='/admin/dashboard'
              onClick={closeDrawer}
            >
              <DashboardIcon />
              Dashboard
            </Link>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <Link
                className={`drawer-link${isActive(history, '/signin')}`}
                to='/signin'
                onClick={closeDrawer}
              >
                <AccountCircleIcon />
                Signin
              </Link>

              <Link
                className={`drawer-link${isActive(history, '/signup')}`}
                to='/signup'
                onClick={closeDrawer}
              >
                <PersonAddIcon />
                Signup
              </Link>
            </Fragment>
          )}
        </nav>

        {isAuthenticated() && (
          <div className='drawer-foot'>
            <button
              type='button'
              className='btn-x btn-x--outline btn-x--block'
              onClick={handleSignout}
            >
              <ExitToAppIcon />
              Signout
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );

  return (
    <header className='nav'>
      <div className='shell'>
        <div className='nav-inner'>
          <Link to='/' className='brand'>
            <span className='brand-mark'>
              <StoreIcon />
            </span>
            BRAND
          </Link>

          <span className='nav-spacer' />

          {desktopLinks()}

          <div className='nav-burger'>
            <Link
              className={`nav-link nav-cart${isActive(history, '/cart')}`}
              to='/cart'
              aria-label='Cart'
            >
              <ShoppingCartIcon />
              {cartBadge()}
            </Link>
            <IconButton
              aria-label='Open menu'
              onClick={() => setDrawerOpen(true)}
              edge='end'
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {mobileDrawer()}
    </header>
  );
};

export default withRouter(MaterialAppBar);
