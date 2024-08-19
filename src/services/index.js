const adobeServices = require('../services/adobe.services');
const spaceServices = require('../services/space.services');

module.exports = {
  ...adobeServices,
  ...spaceServices
};