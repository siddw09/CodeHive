import React from 'react';
import { Command, Users } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import LogoMark from './LogoMark';

const collaborators = ['YN', 'RK', 'PM'];

export default function Navbar({ onOpenPalette }) {
  return (
    <nav className="site-nav">
      <Link className="nav-logo" to="/">
        <LogoMark className="nav-logo-icon" />
        <span className="nav-logo-text">CodeHive</span>
      </Link>

      <div className="nav-links">
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/features">
          Features
        </NavLink>
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/rooms">
          Rooms
        </NavLink>
      </div>

      <div className="nav-right">
        <div className="collaborators-pill">
          <div className="collaborator-stack">
            {collaborators.map((initials) => (
              <span key={initials} className="collaborator-avatar">{initials}</span>
            ))}
          </div>
          <div className="collaborator-meta">
            <span className="collaborator-label">
              <Users size={12} />
              live
            </span>
            <span className="collaborator-count">3 online</span>
          </div>
        </div>

        <button className="palette-pill" type="button" onClick={onOpenPalette}>
          <Command size={14} />
          <span>Quick Actions</span>
        </button>

        <Link className="nav-cta" to="/rooms">
          Create Room
        </Link>
      </div>
    </nav>
  );
}
