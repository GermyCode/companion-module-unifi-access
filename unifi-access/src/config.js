function getConfigFields() {
  return [
    {
      type: 'static-text',
      id: 'info',
      width: 12,
      label: 'Information',
      value: 'This module controls UniFi Access through the UniFi API. Ensure you have a valid IP address and API token.',
    },
    {
      type: 'textinput',
      id: 'ipAddress',
      label: 'Target IP Address',
      width: 8,
      default: '',
    },
    {
      type: 'textinput',
      id: 'apiToken',
      label: 'UniFi API Token',
      width: 8,
    },
    {
      type: 'static-text',
      id: 'info2',
      label: 'Verbose Logging',
      width: 12,
      value: `
        <div class="alert alert-info">
          Enabling this option will put more detail in the log, which can be useful for troubleshooting purposes.
        </div>
      `,
    },
    {
      type: 'checkbox',
      id: 'verbose',
      label: 'Enable Verbose Logging',
      default: false,
      width: 12,
    },
  ];
}

module.exports = { getConfigFields };