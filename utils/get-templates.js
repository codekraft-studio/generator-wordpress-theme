const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = function() {
  let dir = path.join(os.homedir(), '.wordpress-starter');
  if (!fs.existsSync(dir)) {
    return;
  }
  return fs.readdirSync(dir);
};
