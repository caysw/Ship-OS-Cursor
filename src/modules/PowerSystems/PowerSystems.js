import React from 'react';
import { useShipStore } from '../../store/shipStore';

const PowerSystems = () => {
  const powerSystems = useShipStore((state) => state.powerSystems);
  const updateReactorPower = useShipStore((state) => state.updateReactorPower);

  const handlePowerChange = (event) => {
    const newPower = parseInt(event.target.value);
    updateReactorPower(newPower);
  };

  return (
    <div className="power-systems">
      <h1>Power Systems Control</h1>
      
      <div className="grid-2">
        <div className="panel">
          <h3>Main Reactor</h3>
          <p>Status: <span className={`text-${powerSystems.mainReactor.status === 'online' ? 'accent' : 'danger'}`}>
            {powerSystems.mainReactor.status.toUpperCase()}
          </span></p>
          <p>Health: {powerSystems.mainReactor.health}%</p>
          <p>Power Output: {powerSystems.mainReactor.powerOutput} kW</p>
          <p>Max Output: {powerSystems.mainReactor.maxOutput} kW</p>
          <p>Efficiency: {powerSystems.mainReactor.efficiency}%</p>
          <p>Temperature: {powerSystems.mainReactor.temperature}°C</p>
          
          <div style={{ marginTop: '16px' }}>
            <label htmlFor="power-slider">Power Output Control:</label>
            <input
              id="power-slider"
              type="range"
              min="0"
              max={powerSystems.mainReactor.maxOutput}
              value={powerSystems.mainReactor.powerOutput}
              onChange={handlePowerChange}
              style={{ width: '100%', margin: '8px 0' }}
            />
          </div>
          
          {powerSystems.mainReactor.isOverloaded && (
            <p className="text-danger">⚠️ REACTOR OVERLOADED!</p>
          )}
        </div>

        <div className="panel">
          <h3>Power Distribution</h3>
          <p>Status: <span className={`text-${powerSystems.powerDistribution.status === 'online' ? 'accent' : 'danger'}`}>
            {powerSystems.powerDistribution.status.toUpperCase()}
          </span></p>
          <p>Health: {powerSystems.powerDistribution.health}%</p>
          <p>Total Load: {powerSystems.powerDistribution.totalLoad} kW</p>
          <p>Max Capacity: {powerSystems.powerDistribution.maxCapacity} kW</p>
          
          <h4 style={{ marginTop: '16px' }}>Circuit Distribution:</h4>
          {Object.entries(powerSystems.powerDistribution.circuits).map(([name, circuit]) => (
            <div key={name} style={{ marginBottom: '8px' }}>
              <strong>{name.toUpperCase()}:</strong> {circuit.used}/{circuit.allocated} kW
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Backup Power</h3>
          <p>Status: <span className={`text-${powerSystems.backupPower.status === 'standby' ? 'secondary' : 'accent'}`}>
            {powerSystems.backupPower.status.toUpperCase()}
          </span></p>
          <p>Health: {powerSystems.backupPower.health}%</p>
          
          <h4>Batteries:</h4>
          {powerSystems.backupPower.batteries.map((battery) => (
            <div key={battery.id} style={{ marginBottom: '4px' }}>
              {battery.id.toUpperCase()}: {battery.charge}% ({battery.status})
            </div>
          ))}
          
          <h4 style={{ marginTop: '12px' }}>Capacitors:</h4>
          {powerSystems.backupPower.capacitors.map((capacitor) => (
            <div key={capacitor.id} style={{ marginBottom: '4px' }}>
              {capacitor.id.toUpperCase()}: {capacitor.charge}% ({capacitor.status})
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>Fuel Management</h3>
          <p>Status: <span className={`text-${powerSystems.fuelTank.status === 'online' ? 'accent' : 'danger'}`}>
            {powerSystems.fuelTank.status.toUpperCase()}
          </span></p>
          <p>Health: {powerSystems.fuelTank.health}%</p>
          <p>Fuel Level: {powerSystems.fuelTank.currentLevel}/{powerSystems.fuelTank.maxCapacity} units</p>
          <p>Fill Level: {Math.round((powerSystems.fuelTank.currentLevel / powerSystems.fuelTank.maxCapacity) * 100)}%</p>
          <p>Temperature: {powerSystems.fuelTank.temperature}°C</p>
          <p>Pressure: {powerSystems.fuelTank.pressure} atm</p>
          
          <h4 style={{ marginTop: '16px' }}>Sensors:</h4>
          {Object.entries(powerSystems.fuelTank.sensors).map(([sensor, status]) => (
            <div key={sensor} style={{ marginBottom: '4px' }}>
              <span className={`status-indicator status-${status === 'online' ? 'online' : 'error'}`}>●</span>
              {sensor.replace(/([A-Z])/g, ' $1').toUpperCase()}: {status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PowerSystems; 