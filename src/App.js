import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useShipStore } from './store/shipStore';
import Dashboard from './components/Dashboard/Dashboard';
import PowerSystems from './modules/PowerSystems/PowerSystems';
import ComputerSystems from './modules/ComputerSystems/ComputerSystems';
import Navigation from './components/Navigation/Navigation';
import StatusBar from './components/StatusBar/StatusBar';
import './styles/App.css';

function App() {
  const ship = useShipStore((state) => state.ship);
  const alertLevel = ship.alertLevel;

  return (
    <div className={`app app--alert-${alertLevel}`}>
      <StatusBar />
      <div className="app__content">
        <Navigation />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/power" element={<PowerSystems />} />
            <Route path="/computer" element={<ComputerSystems />} />
            <Route path="/weapons" element={<div className="panel">Weapons Module - Coming Soon</div>} />
            <Route path="/defense" element={<div className="panel">Defense Module - Coming Soon</div>} />
            <Route path="/propulsion" element={<div className="panel">Propulsion Module - Coming Soon</div>} />
            <Route path="/life-support" element={<div className="panel">Life Support Module - Coming Soon</div>} />
            <Route path="/cooling" element={<div className="panel">Cooling Module - Coming Soon</div>} />
            <Route path="/electronic-warfare" element={<div className="panel">Electronic Warfare Module - Coming Soon</div>} />
            <Route path="/sensors" element={<div className="panel">Sensors Module - Coming Soon</div>} />
            <Route path="/communication" element={<div className="panel">Communication Module - Coming Soon</div>} />
            <Route path="/infrastructure" element={<div className="panel">Infrastructure Module - Coming Soon</div>} />
            <Route path="/navigation" element={<div className="panel">Navigation Module - Coming Soon</div>} />
            <Route path="/storage" element={<div className="panel">Storage Module - Coming Soon</div>} />
            <Route path="/settings" element={<div className="panel">Settings Module - Coming Soon</div>} />
            <Route path="/entertainment" element={<div className="panel">Entertainment Module - Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App; 