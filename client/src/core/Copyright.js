import React from 'react';

export default function Copyright() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column">
          <h3>About us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </p>
        </div>

        <div className="footer-column">
          <h3>Useful links</h3>
          <ul>
            <li>Downloadable product</li>
            <li>On sale product</li>
            <li>Our new product</li>
            <li>Order tracking</li>
            <li>Payment methods</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Download</h3>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Pinterest</li>
            <li>Youtube</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Call center</h3>
          <p>Monday to Friday: 9–20</p>
          <p>Saturday to Sunday: closed</p>
          <p>arredo@example.com</p>
          <p>+1 333 555</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-nav">
          <a href="#">Home</a>
          <a href="/shop">Shop</a>
          <a href="/cart">Cart</a>
          <a href="/dashboard">Dashboard</a>
        </div>
        <div className="footer-copy">
          <p>© Qode Interactive</p>
          {/* <button className="scroll-top">
            <a href="#top">↑</a>
          </button> */}
        </div>
      </div>
    </footer>
  );
}
