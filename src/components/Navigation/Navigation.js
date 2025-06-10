import React from 'react';
import { NavLink } from 'react-router-dom';
import { useShipStore } from '../../store/shipStore';
import './Navigation.css';

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: '⚡', shortKey: 'D' },
  { path: '/power', label: 'Power Systems', icon: '🔋', shortKey: 'P' },
  { path: '/computer', label: 'Computer/AI', icon: '🖥️', shortKey: 'C' },
  { path: '/weapons', label: 'Weapons', icon: '🔫', shortKey: 'W' },
  { path: '/defense', label: 'Defense', icon: '🛡️', shortKey: 'F' },
  { path: '/propulsion', label: 'Propulsion', icon: '🚀', shortKey: 'R' },
  { path: '/life-support', label: 'Life Support', icon: '💨', shortKey: 'L' },
  { path: '/cooling', label: 'Cooling', icon: '❄️', shortKey: 'O' },
  { path: '/electronic-warfare', label: 'Electronic Warfare', icon: '📡', shortKey: 'E' },
  { path: '/sensors', label: 'Sensors', icon: '📊', shortKey: 'S' },
  { path: '/communication', label: 'Communication', icon: '📞', shortKey: 'M' },
  { path: '/infrastructure', label: 'Infrastructure', icon: '🏗️', shortKey: 'I' },
  { path: '/navigation', label: 'Navigation', icon: '🧭', shortKey: 'N' },
  { path: '/storage', label: 'Storage', icon: '📦', shortKey: 'T' },
  { path: '/settings', label: 'Settings', icon: '⚙️', shortKey: 'G' },
  { path: '/entertainment', label: 'Entertainment', icon: '🎮', shortKey: 'H' }
];

const Navigation = () => {
  const powerSystems = useShipStore((state) => state.powerSystems);
  const computerSystems = useShipStore((state) => state.computerSystems);

  const getSystemStatus = (path) => {
    switch (path) {
      case '/power':
        return powerSystems.mainReactor.status;
      case '/computer':
        return computerSystems.centralCore.status;
      default:
        return 'offline';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'var(--primary-green)';
      case 'warning': return 'var(--warning-orange)';
      case 'error': return 'var(--danger-red)';
      case 'offline': return 'var(--text-muted)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <nav className="navigation">
      <div className="navigation__header">
        <h2>SHIP SYSTEMS</h2>
        <div className="navigation__version">v2.1.0</div>
      </div>
      
      <ul className="navigation__list">
        {navigationItems.map((item) => {
          const status = getSystemStatus(item.path);
          const statusColor = getStatusColor(status);
          
          return (
            <li key={item.path} className="navigation__item">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `navigation__link ${isActive ? 'navigation__link--active' : ''}`
                }
              >
                <span className="navigation__icon">{item.icon}</span>
                <span className="navigation__label">{item.label}</span>
                <span 
                  className="navigation__status"
                  style={{ color: statusColor }}
                >
                  ●
                </span>
                <kbd className="navigation__shortkey">{item.shortKey}</kbd>
              </NavLink>
            </li>
          );
        })}
      </ul>
      
      <div className="navigation__footer">
        <div className="navigation__legend">
          <div className="legend-item">
            <span style={{ color: 'var(--primary-green)' }}>●</span> Online
          </div>
          <div className="legend-item">
            <span style={{ color: 'var(--warning-orange)' }}>●</span> Warning
          </div>
          <div className="legend-item">
            <span style={{ color: 'var(--danger-red)' }}>●</span> Error
          </div>
          <div className="legend-item">
            <span style={{ color: 'var(--text-muted)' }}>●</span> Offline
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 