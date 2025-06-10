import React from 'react';
import { Link } from 'react-router-dom';
import { useShipStore } from '../../store/shipStore';
import SystemCard from '../SystemCard/SystemCard';
import './Dashboard.css';

const Dashboard = () => {
  const ship = useShipStore((state) => state.ship);
  const powerSystems = useShipStore((state) => state.powerSystems);
  const computerSystems = useShipStore((state) => state.computerSystems);
  const simulateDamage = useShipStore((state) => state.simulateDamage);
  const simulateRepair = useShipStore((state) => state.simulateRepair);

  const systemsOverview = [
    {
      id: 'power',
      name: 'Power Systems',
      icon: '🔋',
      status: powerSystems.mainReactor.status,
      health: powerSystems.mainReactor.health,
      details: `${powerSystems.mainReactor.powerOutput}/${powerSystems.mainReactor.maxOutput} kW`,
      path: '/power'
    },
    {
      id: 'computer',
      name: 'Computer/AI',
      icon: '🖥️',
      status: computerSystems.centralCore.status,
      health: computerSystems.centralCore.health,
      details: `CPU: ${computerSystems.centralCore.cpuUsage}% | RAM: ${computerSystems.centralCore.memoryUsage}%`,
      path: '/computer'
    },
    {
      id: 'weapons',
      name: 'Weapons',
      icon: '🔫',
      status: 'offline',
      health: 100,
      details: 'Systems Offline',
      path: '/weapons'
    },
    {
      id: 'defense',
      name: 'Defense',
      icon: '🛡️',
      status: 'online',
      health: 95,
      details: 'Shields Ready',
      path: '/defense'
    },
    {
      id: 'propulsion',
      name: 'Propulsion',
      icon: '🚀',
      status: 'online',
      health: 87,
      details: 'Engines Nominal',
      path: '/propulsion'
    },
    {
      id: 'life-support',
      name: 'Life Support',
      icon: '💨',
      status: 'online',
      health: 92,
      details: 'Atmosphere Stable',
      path: '/life-support'
    }
  ];

  const quickActions = [
    {
      label: 'Emergency Power',
      action: () => console.log('Emergency power activated'),
      className: 'button button--warning'
    },
    {
      label: 'All Stop',
      action: () => console.log('All stop initiated'),
      className: 'button button--danger'
    },
    {
      label: 'Simulate Damage',
      action: () => simulateDamage('powerSystems.mainReactor', 15),
      className: 'button button--secondary'
    },
    {
      label: 'Repair Systems',
      action: () => simulateRepair('powerSystems.mainReactor', 10),
      className: 'button button--success'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Ship Control Dashboard</h1>
        <div className="dashboard__ship-status">
          <h2>{ship.name}</h2>
          <p className="text-secondary">{ship.mission}</p>
          <div className="dashboard__status-badges">
            <span className={`badge badge--${ship.status === 'operational' ? 'success' : 'warning'}`}>
              {ship.status.toUpperCase()}
            </span>
            <span className={`badge badge--${ship.alertLevel === 'green' ? 'success' : ship.alertLevel === 'yellow' ? 'warning' : 'danger'}`}>
              ALERT: {ship.alertLevel.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard__systems-grid">
        {systemsOverview.map((system) => (
          <SystemCard
            key={system.id}
            {...system}
          />
        ))}
      </div>

      <div className="dashboard__quick-actions">
        <h3>Quick Actions</h3>
        <div className="dashboard__actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={action.className}
              onClick={action.action}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard__mission-info">
        <div className="panel">
          <h3>Mission Information</h3>
          <div className="grid-2">
            <div>
              <h4>Current Mission</h4>
              <p>{ship.mission}</p>
              
              <h4>Location</h4>
              <p>{ship.location}</p>
              
              <h4>Ship Class</h4>
              <p>{ship.class}</p>
            </div>
            <div>
              <h4>Captain</h4>
              <p>{ship.captain}</p>
              
              <h4>Crew</h4>
              <p>{ship.crew} personnel</p>
              
              <h4>Registry</h4>
              <p>{ship.registry}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 