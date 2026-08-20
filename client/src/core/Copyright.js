import React from 'react';

import StoreIcon from '@material-ui/icons/Store';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

export default function Copyright() {
  return (
    <footer className='site-footer'>
      <div className='shell'>
        <div className='footer-grid'>
          <div className='footer-column'>
            <span className='footer-brand'>
              <span className='brand-mark'>
                <StoreIcon />
              </span>
              BRAND
            </span>
            <h3>About us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi.
            </p>
          </div>

          <div className='footer-column'>
            <h3>Useful links</h3>
            <ul>
              <li>Downloadable product</li>
              <li>On sale product</li>
              <li>Our new product</li>
              <li>Order tracking</li>
              <li>Payment methods</li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3>Download</h3>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Pinterest</li>
              <li>Youtube</li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3>Call center</h3>
            <div className='footer-contact'>
              <ScheduleIcon />
              <span>Monday to Friday: 9–20</span>
            </div>
            <div className='footer-contact'>
              <ScheduleIcon />
              <span>Saturday to Sunday: closed</span>
            </div>
            <div className='footer-contact'>
              <MailOutlineIcon />
              <span>arredo@example.com</span>
            </div>
            <div className='footer-contact'>
              <PhoneIcon />
              <span>+1 333 555</span>
            </div>
          </div>
        </div>

        <div className='footer-bar'>
          <nav className='footer-nav' aria-label='Footer navigation'>
            <a href='/'>Home</a>
            <a href='/shop'>Shop</a>
            <a href='/cart'>Cart</a>
            <a href='/dashboard'>Dashboard</a>
          </nav>
          <p style={{ margin: 0 }}>© Qode Interactive</p>
        </div>
      </div>
    </footer>
  );
}
