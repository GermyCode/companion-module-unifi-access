async function initActions(self) {
  const doors = await self.unifiAccess.getDoors();
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
          default: doorOptions.length > 0 ? doorOptions[0].id : ''
        }
      ],
      callback: async (action) => {
        const { doorId } = action.options;
        if (doorId) {
          const result = await self.unifiAccess.unlockDoor(doorId);
          self.log('info', `Unlock door response: ${JSON.stringify(result)}`);
        }
      }
    },

    lock_door: {
      name: 'Lock Door',
      options: [
        {
          type: 'dropdown',
          label: 'Select Door',
          id: 'doorId',
          choices: doorOptions,
          default: doorOptions.length > 0 ? doorOptions[0].id : ''
        }
      ],
      callback: async (action) => {
        const { doorId } = action.options;
        if (doorId) {
          const result = await self.unifiAccess.lockDoor(doorId);
          self.log('info', `Lock door response: ${JSON.stringify(result)}`);
        }
      }
    },

    get_door_status: {
      name: 'Get Door Status',
      options: [
        {
          type: 'dropdown',
          label: 'Select Door',
          id: 'doorId',
          choices: doorOptions,
          default: doorOptions.length > 0 ? doorOptions[0].id : ''
        }
      ],
      callback: async (action) => {
        const { doorId } = action.options;
        if (doorId) {
          const status = await self.unifiAccess.getDoorStatus(doorId);
          self.log('info', `Door status: ${JSON.stringify(status)}`);
        }
      }
    }
  });
}

module.exports = { initActions };
