import { create } from 'zustand';

// Initial state for all ship systems
const initialState = {
  // Power Systems
  powerSystems: {
    mainReactor: {
      id: 'main-reactor',
      name: 'Main Reactor',
      status: 'online',
      health: 100,
      powerOutput: 2500, // kW
      fuelConsumption: 12.5, // units/hour
      temperature: 85, // Celsius
      efficiency: 92, // %
      maxOutput: 3000,
      isOverloaded: false,
    },
    powerDistribution: {
      id: 'power-distribution',
      name: 'Power Distribution Node',
      status: 'online',
      health: 98,
      totalLoad: 1800, // kW
      maxCapacity: 2800, // kW
      converters: [
        { id: 'conv-1', status: 'online', load: 400 },
        { id: 'conv-2', status: 'online', load: 350 },
        { id: 'conv-3', status: 'warning', load: 280 }
      ],
      circuits: {
        lifesupport: { allocated: 300, used: 285 },
        propulsion: { allocated: 800, used: 750 },
        weapons: { allocated: 400, used: 0 },
        sensors: { allocated: 200, used: 180 },
        computing: { allocated: 150, used: 135 },
        misc: { allocated: 100, used: 85 }
      }
    },
    backupPower: {
      id: 'backup-power',
      name: 'Backup Power Systems',
      status: 'standby',
      health: 100,
      batteries: [
        { id: 'bat-1', charge: 100, capacity: 500, status: 'charged' },
        { id: 'bat-2', charge: 98, capacity: 500, status: 'charged' },
        { id: 'bat-3', charge: 95, capacity: 500, status: 'charged' }
      ],
      capacitors: [
        { id: 'cap-1', charge: 100, status: 'ready' },
        { id: 'cap-2', charge: 100, status: 'ready' }
      ]
    },
    fuelTank: {
      id: 'fuel-tank',
      name: 'Fuel Storage',
      status: 'online',
      health: 100,
      currentLevel: 2400, // units
      maxCapacity: 3000, // units
      sensors: {
        level: 'online',
        pressure: 'online',
        temperature: 'online',
        leakDetection: 'online'
      },
      temperature: 18, // Celsius
      pressure: 2.1 // atm
    }
  },

  // Computer/AI Systems
  computerSystems: {
    centralCore: {
      id: 'central-core',
      name: 'Central Computer Core',
      status: 'online',
      health: 100,
      cpuUsage: 35,
      memoryUsage: 42,
      processes: 127,
      uptime: 8547 // hours
    },
    aiSystems: {
      id: 'ai-systems',
      name: 'AI Assistant',
      status: 'online',
      health: 100,
      mode: 'assistant',
      learningEnabled: true,
      autonomyLevel: 3 // 1-5 scale
    },
    cyberDefense: {
      id: 'cyber-defense',
      name: 'Cyber Defense',
      status: 'active',
      health: 100,
      threatsDetected: 0,
      firewallStatus: 'active',
      encryptionLevel: 'military'
    }
  },

  // Add other systems as needed...
  weapons: {
    status: 'offline',
    systems: []
  },

  defense: {
    status: 'online',
    systems: []
  },

  propulsion: {
    status: 'online',
    systems: []
  },

  lifeSupport: {
    status: 'online',
    systems: []
  },

  cooling: {
    status: 'online',
    systems: []
  },

  // Global ship status
  ship: {
    name: 'USS ENTERPRISE NX-01',
    class: 'Explorer',
    registry: 'NX-01',
    captain: 'Jonathan Archer',
    crew: 83,
    status: 'operational',
    alertLevel: 'green', // green, yellow, red
    location: 'Earth Orbit',
    mission: 'Deep Space Exploration'
  }
};

export const useShipStore = create((set, get) => ({
  ...initialState,

  // Actions for Power Systems
  updateReactorStatus: (status) => set((state) => ({
    powerSystems: {
      ...state.powerSystems,
      mainReactor: {
        ...state.powerSystems.mainReactor,
        status
      }
    }
  })),

  updateReactorPower: (powerOutput) => set((state) => ({
    powerSystems: {
      ...state.powerSystems,
      mainReactor: {
        ...state.powerSystems.mainReactor,
        powerOutput,
        isOverloaded: powerOutput > state.powerSystems.mainReactor.maxOutput
      }
    }
  })),

  updatePowerDistribution: (circuitName, allocation) => set((state) => ({
    powerSystems: {
      ...state.powerSystems,
      powerDistribution: {
        ...state.powerSystems.powerDistribution,
        circuits: {
          ...state.powerSystems.powerDistribution.circuits,
          [circuitName]: {
            ...state.powerSystems.powerDistribution.circuits[circuitName],
            allocated: allocation
          }
        }
      }
    }
  })),

  updateSystemHealth: (systemPath, health) => set((state) => {
    const pathArray = systemPath.split('.');
    const newState = { ...state };
    let current = newState;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current[pathArray[i]] = { ...current[pathArray[i]] };
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = {
      ...current[pathArray[pathArray.length - 1]],
      health
    };
    
    return newState;
  }),

  setAlertLevel: (level) => set((state) => ({
    ship: {
      ...state.ship,
      alertLevel: level
    }
  })),

  // Generic system status updater
  updateSystemStatus: (systemPath, status) => set((state) => {
    const pathArray = systemPath.split('.');
    const newState = { ...state };
    let current = newState;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current[pathArray[i]] = { ...current[pathArray[i]] };
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = {
      ...current[pathArray[pathArray.length - 1]],
      status
    };
    
    return newState;
  }),

  // Simulation actions
  simulateDamage: (systemPath, damageAmount) => {
    const currentHealth = get()[systemPath.split('.')[0]][systemPath.split('.')[1]].health;
    const newHealth = Math.max(0, currentHealth - damageAmount);
    get().updateSystemHealth(systemPath, newHealth);
  },

  simulateRepair: (systemPath, repairAmount) => {
    const currentHealth = get()[systemPath.split('.')[0]][systemPath.split('.')[1]].health;
    const newHealth = Math.min(100, currentHealth + repairAmount);
    get().updateSystemHealth(systemPath, newHealth);
  }
})); 