const path = require('path');
const actOnModules = require('../index.js');

var moduleDirectories = [];

actOnModules.sync(path.join(__dirname, 'dummy_project'), (directory) => {
    moduleDirectories.push(directory);
}); 

console.log(moduleDirectories);
