const { InstanceBase, runEntrypoint } = require('@companion-module/base');
const { getConfigFields } = require('./config');
const { initActions } = require('./actions');
const unifiApi = require('./api');

class UnifiAccessInstance extends InstanceBase {
  constructor(internal) {
    super(internal);

    // Assign external methods to this class
    Object.assign(this, {
      ...unifiApi,
      getConfigFields,
      initActions,
    });

    this.connection = null; // Store API connection object
  }

  async init(config) {
    this.updateConfig(config);
  }

  async updateConfig(config) {
    this.config = config;

    if (this.config.ipAddress && this.config.apiToken) {
      this.connection = unifiApi.initConnection(this.config.ipAddress, this.config.apiToken);
      this.log('info', 'Connected to UniFi Access API');

      // Initialize actions with the updated connection
      await this.initActions(this);
    } else {
      this.log('error', 'Missing IP Address or API Token');
    }
  }

  getConfigFields() {
    return getConfigFields();
  }

  async destroy() {
    this.log('debug', 'UniFi Access module destroyed');
  }
}

runEntrypoint(UnifiAccessInstance, {});
