const path = require('path');
const actOnModules = require('../index.js');

var moduleDirectories = [];

actOnModules(path.join(__dirname, 'dummy_project'), (directory) => {
    moduleDirectories.push(directory);
}).then(() => {
    console.log(moduleDirectories);
}); 
