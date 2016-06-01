const fs = require('fs');
const path = require('path');
Promise = require('bluebird');

var fsAccess = Promise.promisify(fs.access);
var fsReadDir = Promise.promisify(fs.readdir);
var fsLstat = Promise.promisify(fs.lstat);

function actOnModulesSync(directory, action)
{
    try
    {
        fs.accessSync(directory, fs.F_OK);
        var files = fs.readdirSync(directory);
        if(files.some(function(file) {
            return(file == "package.json");
        }))
        {
            action(directory);
        }
        else
        {
            files.forEach(function(file) {
                if(fs.lstatSync(path.join(directory, file)).isDirectory() && file != "node_modules")
                {
                    actOnModulesSync(path.join(directory, file), action);
                }
            });
        }
    }
    catch(err)
    {
    }
}

function actOnModules(directory, action, callback)
{
    if(!callback)
    {
        return new Promise((fulfill, reject) => {
            actOnModules(directory, action, (err) => {
                if(err)
                {
                    reject(err);
                    return;
                }
                fulfill();
            });
        });
        
    }
    fsAccess(directory, fs.F_OK).then(() => {
        return fsReadDir(directory);
    }).then((files) => {
        if(files.some(function(file) {
            return(file == "package.json");
        }))
        {
            action(directory);
        }
        else
        {
            var promises = files.map((file) => {
                return fsLstat(path.join(directory, file)).then((stats) => {
                    if(stats.isDirectory() && file != "node_modules")
                    {
                        return actOnModules(path.join(directory, file), action);
                    }
                });
            });
            return Promise.all(promises);
        }
    }).then(() => {
        callback(null);
    }).catch((err) => {
        callback(err);
    });
}

actOnModules.sync = actOnModulesSync;

module.exports = actOnModules;