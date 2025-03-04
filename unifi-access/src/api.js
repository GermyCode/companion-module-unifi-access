const axios = require('axios');

function initConnection(ipAddress, apiToken) {
  return {
    baseUrl: `https://${ipAddress}/api/v2/access/door`,
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  };
}

async function getDoors(connection) {
  return _request('GET', '', connection);
}

async function unlockDoor(doorId, connection) {
  return _request('POST', `${doorId}/unlock`, connection);
}

async function lockDoor(doorId, connection) {
  return _request('POST', `${doorId}/lock`, connection);
}

async function getDoorStatus(doorId, connection) {
  return _request('GET', `${doorId}`, connection);
}

async function _request(method, endpoint, connection) {
  try {
    const response = await axios({
      method,
      url: `${connection.baseUrl}/${endpoint}`,
      headers: connection.headers
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error during ${method} request to ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

module.exports = { initConnection, getDoors, unlockDoor, lockDoor, getDoorStatus };
