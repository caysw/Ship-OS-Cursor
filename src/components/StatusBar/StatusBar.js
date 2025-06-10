import React, { useState, useEffect } from 'react';
import { useShipStore } from '../../store/shipStore';
import './StatusBar.css';

const StatusBar = () => {
  const ship = useShipStore((state) => state.ship);
  const powerSystems = useShipStore((state) => state.powerSystems);
  const setAlertLevel = useShipStore((state) => state.setAlertLevel);
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPowerPercentage = () => {
    const reactor = powerSystems.mainReactor;
    return Math.round((reactor.powerOutput / reactor.maxOutput) * 100);
  };

  const getOverallSystemHealth = () => {
    // Calculate average health from all systems
    const systems = [
      powerSystems.mainReactor.health,
      powerSystems.powerDistribution.health,
      powerSystems.backupPower.health,
      powerSystems.fuelTank.health
    ];
    
    return Math.round(systems.reduce((a, b) => a + b, 0) / systems.length);
  };

  const handleAlertLevelChange = () => {
    const levels = ['green', 'yellow', 'red'];
    const currentIndex = levels.indexOf(ship.alertLevel);
    const nextIndex = (currentIndex + 1) % levels.length;
    setAlertLevel(levels[nextIndex]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className={`status-bar status-bar--alert-${ship.alertLevel}`}>
      <div className="status-bar__section">
        <div className="status-bar__ship-info">
          <strong>{ship.name}</strong>
          <span className="status-bar__registry">{ship.registry}</span>
        </div>
      </div>

      <div className="status-bar__section">
        <div className="status-bar__alert" onClick={handleAlertLevelChange}>
          <span className={`status-indicator status-${ship.alertLevel === 'green' ? 'online' : ship.alertLevel === 'yellow' ? 'warning' : 'error'}`}></span>
          <span className="status-bar__alert-text">
            ALERT: {ship.alertLevel.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="status-bar__section">
        <div className="status-bar__metrics">
          <div className="metric">
            <span className="metric__label">PWR</span>
            <span className="metric__value">{getPowerPercentage()}%</span>
          </div>
          <div className="metric">
            <span className="metric__label">SYS</span>
            <span className="metric__value">{getOverallSystemHealth()}%</span>
          </div>
          <div className="metric">
            <span className="metric__label">CREW</span>
            <span className="metric__value">{ship.crew}</span>
          </div>
        </div>
      </div>

      <div className="status-bar__section">
        <div className="status-bar__location">
          <span className="status-bar__location-label">LOC:</span>
          <span className="status-bar__location-value">{ship.location}</span>
        </div>
      </div>

      <div className="status-bar__section">
        <div className="status-bar__time">
          <div className="status-bar__date">{formatDate(currentTime)}</div>
          <div className="status-bar__clock">{formatTime(currentTime)}</div>
        </div>
      </div>

      <div className="status-bar__section">
        <div className="status-bar__captain">
          <span className="status-bar__captain-label">CPT:</span>
          <span className="status-bar__captain-name">{ship.captain}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar; 