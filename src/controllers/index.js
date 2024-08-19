const controller = require('./controllers');
const spaceController = require('./space.controller');

module.exports = {
  ...controller,
  ...spaceController
};