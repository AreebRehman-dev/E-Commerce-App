import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Copyright from './Copyright';
import HeroArt from './HeroArt';
import '../styles.css';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

/**
 * Page shell: sticky navigation, a page header (full hero on landing pages,
 * compact header everywhere else), the page body and the site footer.
 */
const Layout = ({
  title = 'Title',
  description = 'Description',
  hero = false,
  crumb,
  actions,
  wide = false,
  children,
}) => (
  <div className='app-shell' id='top'>
    <Menu />

    {hero ? (
      <header className='hero'>
        <div className={`shell${wide ? ' shell--wide' : ''}`}>
          <div className='hero-grid'>
            <div>
              <h1 className='hero-title'>{title}</h1>
              <p className='hero-sub'>{description}</p>
              <div className='hero-actions'>
                <Link className='btn-x btn-x--light btn-x--lg' to='/shop'>
                  Shop now
                  <ArrowForwardIcon />
                </Link>
                <Link className='btn-x btn-x--glass btn-x--lg' to='/cart'>
                  <ShoppingBasketIcon />
                  View cart
                </Link>
              </div>
            </div>
            <div className='hero-art' aria-hidden='true'>
              <HeroArt />
            </div>
          </div>
        </div>
      </header>
    ) : (
      <header className='pagehead'>
        <div className={`shell${wide ? ' shell--wide' : ''}`}>
          <div className='pagehead-grid'>
            <div>
              <nav className='crumbs' aria-label='Breadcrumb'>
                <Link to='/'>Home</Link>
                <ChevronRightIcon />
                <span>{crumb || title}</span>
              </nav>
              <h1 className='pagehead-title'>{title}</h1>
              <p className='pagehead-sub'>{description}</p>
              {actions ? (
                <div className='pagehead-actions u-wrap-actions'>{actions}</div>
              ) : null}
            </div>
            <div className='pagehead-art' aria-hidden='true'>
              <HeroArt />
            </div>
          </div>
        </div>
      </header>
    )}

    <main className='page-body'>
      <div className={`shell${wide ? ' shell--wide' : ''}`}>{children}</div>
    </main>

    <Copyright />
  </div>
);

export default Layout;
