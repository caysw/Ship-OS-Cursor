import React from 'react';
import { useShipStore } from '../../store/shipStore';

const ComputerSystems = () => {
  const computerSystems = useShipStore((state) => state.computerSystems);

  return (
    <div className="computer-systems">
      <h1>Computer & AI Systems</h1>
      
      <div className="grid-3">
        <div className="panel">
          <h3>Central Computer Core</h3>
          <p>Status: <span className={`text-${computerSystems.centralCore.status === 'online' ? 'accent' : 'danger'}`}>
            {computerSystems.centralCore.status.toUpperCase()}
          </span></p>
          <p>Health: {computerSystems.centralCore.health}%</p>
          <p>CPU Usage: {computerSystems.centralCore.cpuUsage}%</p>
          <p>Memory Usage: {computerSystems.centralCore.memoryUsage}%</p>
          <p>Active Processes: {computerSystems.centralCore.processes}</p>
          <p>Uptime: {computerSystems.centralCore.uptime} hours</p>
        </div>

        <div className="panel">
          <h3>AI Assistant</h3>
          <p>Status: <span className={`text-${computerSystems.aiSystems.status === 'online' ? 'accent' : 'danger'}`}>
            {computerSystems.aiSystems.status.toUpperCase()}
          </span></p>
          <p>Health: {computerSystems.aiSystems.health}%</p>
          <p>Mode: {computerSystems.aiSystems.mode}</p>
          <p>Learning: {computerSystems.aiSystems.learningEnabled ? 'Enabled' : 'Disabled'}</p>
          <p>Autonomy Level: {computerSystems.aiSystems.autonomyLevel}/5</p>
        </div>

        <div className="panel">
          <h3>Cyber Defense</h3>
          <p>Status: <span className={`text-${computerSystems.cyberDefense.status === 'active' ? 'accent' : 'danger'}`}>
            {computerSystems.cyberDefense.status.toUpperCase()}
          </span></p>
          <p>Health: {computerSystems.cyberDefense.health}%</p>
          <p>Threats Detected: {computerSystems.cyberDefense.threatsDetected}</p>
          <p>Firewall: {computerSystems.cyberDefense.firewallStatus}</p>
          <p>Encryption: {computerSystems.cyberDefense.encryptionLevel}</p>
        </div>
      </div>

      <div className="panel">
        <h3>System Diagnostics</h3>
        <p className="text-secondary">Computer systems module - Full implementation coming soon...</p>
        <p className="text-muted">This module will include detailed computer management, AI configuration, security monitoring, and system diagnostics.</p>
      </div>
    </div>
  );
};

export default ComputerSystems; 