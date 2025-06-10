import React from 'react';
import { Link } from 'react-router-dom';
import './SystemCard.css';

const SystemCard = ({ id, name, icon, status, health, details, path }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'var(--primary-green)';
      case 'warning': return 'var(--warning-orange)';
      case 'error': return 'var(--danger-red)';
      case 'offline': return 'var(--text-muted)';
      default: return 'var(--text-muted)';
    }
  };

  const getHealthColor = (health) => {
    if (health >= 80) return 'var(--primary-green)';
    if (health >= 60) return 'var(--warning-orange)';
    return 'var(--danger-red)';
  };

  const getHealthStatus = (health) => {
    if (health >= 90) return 'Excellent';
    if (health >= 75) return 'Good';
    if (health >= 50) return 'Fair';
    if (health >= 25) return 'Poor';
    return 'Critical';
  };

  return (
    <Link to={path} className="system-card">
      <div className={`system-card__content system-card--${status}`}>
        <div className="system-card__header">
          <div className="system-card__icon">{icon}</div>
          <div className="system-card__title">
            <h3>{name}</h3>
            <div className="system-card__status">
              <span 
                className="status-indicator"
                style={{ color: getStatusColor(status) }}
              >
                ●
              </span>
              <span className="system-card__status-text">
                {status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="system-card__health">
          <div className="system-card__health-label">
            <span>System Health</span>
            <span className="system-card__health-value">{health}%</span>
          </div>
          <div className="system-card__health-bar">
            <div 
              className="system-card__health-fill"
              style={{ 
                width: `${health}%`,
                backgroundColor: getHealthColor(health)
              }}
            />
          </div>
          <div className="system-card__health-status">
            {getHealthStatus(health)}
          </div>
        </div>

        <div className="system-card__details">
          {details}
        </div>

        <div className="system-card__actions">
          <div className="system-card__link-indicator">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SystemCard; 