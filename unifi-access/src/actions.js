const api = require('./api');

async function initActions(self) {
  if (!self.unifiAccess) {
    self.log('error', 'UniFi Access API is not initialized.');
    return;
  }

  try {
    const doors = await api.getDoors(self.unifiAccess);
    const doorOptions = doors.map((door) => ({ id: door.id, label: door.name }));

    self.setActions({
      unlock_door: {
        name: 'Unlock Door',
        options: [
          {
            type: 'dropdown',
            label: 'Select Door',
            id: 'doorId',
            choices: doorOptions,
            default: doorOptions[0]?.id || ''
          }
        ],
        callback: async (action) => {
          const { doorId } = action.options;
          if (doorId) {
            const result = await api.unlockDoor(doorId, self.unifiAccess);
            if (self.config.verbose) self.log('info', `Unlock Response: ${JSON.stringify(result)}`);
          }
        },
      },
      lock_door: {
        name: 'Lock Door',
        options: [
          {
            type: 'dropdown',
            label: 'Select Door',
            id: 'doorId',
            choices: doorOptions,
            default: doorOptions[0]?.id || ''
          }
        ],
        callback: async (action) => {
          const { doorId } = action.options;
          if (doorId) {
            const result = await api.lockDoor(doorId, self.unifiAccess);
            if (self.config.verbose) self.log('info', `Lock Response: ${JSON.stringify(result)}`);
          }
        },
      },
      get_door_status: {
        name: 'Get Door Status',
        options: [
          {
            type: 'dropdown',
            label: 'Select Door',
            id: 'doorId',
            choices: doorOptions,
            default: doorOptions[0]?.id || ''
          }
        ],
        callback: async (action) => {
          const { doorId } = action.options;
          if (doorId) {
            const status = await api.getDoorStatus(doorId, self.unifiAccess);
            if (self.config.verbose) self.log('info', `Door status: ${JSON.stringify(status)}`);
          }
        },
      },
    });
  } catch (error) {
    self.log('error', `Failed to load doors: ${error.message}`);
  }
}

module.exports = { initActions };