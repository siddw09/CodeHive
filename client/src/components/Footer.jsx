import React from 'react';
import { Link } from 'react-router-dom';
import LogoMark from './LogoMark';

const stack = ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Monaco Editor'];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-column footer-brand">
          <div className="footer-mark">
            <LogoMark className="footer-mark-icon" />
            <span className="footer-mark-text">CodeHive</span>
          </div>
          <p className="footer-tagline">
            Real-time code reviews for focused teams. Built for developers who want sharp feedback loops and fewer messy handoffs.
          </p>
          <p className="footer-note">Designed for React, Node, MongoDB, Socket.IO and Monaco workflows.</p>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Navigate</p>
          <div className="footer-links">
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/features">Features</Link>
            <Link className="footer-link" to="/rooms">Rooms</Link>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Built With</p>
          <div className="footer-tags">
            {stack.map((item) => (
              <span key={item} className="footer-tag">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>BUILD WITH TASTE</span>
        <span>v1.0.0 | CodeHive UI</span>
      </div>
    </footer>
  );
}
