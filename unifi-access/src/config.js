// config.js - Configuration fields for Companion

function getConfigFields() {
  return [
    {
      type: 'textinput',
      id: 'ipAddress',
      label: 'UniFi Controller IP Address',
      width: 6,
      default: '192.168.1.1'
    },
    {
      type: 'textinput',
      id: 'apiToken',
      label: 'API Token',
      width: 6,
      default: ''
    }
  ];
}

module.exports = { getConfigFields };
