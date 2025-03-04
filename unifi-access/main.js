const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const { initConnection } = require('./src/api');
const { initActions } = require('./src/actions');
const { getConfigFields } = require('./src/config');

class unifiInstance extends InstanceBase {
  constructor(internal) {
    super(internal);
    Object.assign(this, { initActions, getConfigFields });
  }

  async init() {
    // Log current configuration for debugging purposes
    this.log('debug', `Initializing with config: ${JSON.stringify(this.config)}`);
    
    if (!this.config) {
      this.log('error', 'No configuration provided yet.');
      return;
    }

    const { ipAddress, apiToken, verbose } = this.config;
    if (!ipAddress || !apiToken) {
      this.log('error', 'Missing required configuration: IP Address and/or API Token.');
      return;
    }

    // Initialize the API connection using the configuration values
    this.unifiAccess = initConnection(ipAddress, apiToken, verbose);
    await this.initActions(this);
  }

  // This method is called when configuration is updated or loaded from persistence.
  configUpdated(config) {
    this.config = config;
    this.log('debug', `Configuration updated: ${JSON.stringify(config)}`);
    this.init();
  }

  async destroy() {
    this.log('debug', 'UniFi Access module destroyed');
  }
}

runEntrypoint(unifiInstance, {});