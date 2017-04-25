'use strict';

const deepFreeze = require('deep-freeze');
const {debugPrint} = require('./src/utils');

module.exports = deepFreeze({
});

if (!module.parent)
  debugPrint(module.exports);
