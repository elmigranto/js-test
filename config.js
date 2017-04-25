'use strict';

const {deepFreeze, debugPrint} = require('./src/utils');

module.exports = deepFreeze({
});

if (!module.parent)
  debugPrint(module.exports);
