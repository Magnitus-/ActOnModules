#Purpose

This project is provides a utility that iterates recursively in a given directory, skips over node_module directories and stops iterating recursively in any directory containing a package.json file to execute a user-defined action with the directory as an argument.

#Usage

##Sync

```
const actOnModules = require('act-on-modules');

actOnModules.sync('SomePathToADirectory', (directory) => {
    //put your logic here
});
```

##Async with callback

```
actOnModules('SomePathToADirectory', 
(directory) => {
    //put your logic here
},
(err) => {
    //This is the callback once everything is done
    //Be mindful that asynchronous operations in your custom action might not have completed
    //You'll have to add an additional layer of logic with nimble/async or promises if you want asynchronous flow control
});
```

##Async with promise

```
actOnModules('SomePathToADirectory', 
(directory) => {
    //put your logic here
}).then(() => {
    //This is the callback once everything is done without any error
    //Be mindful that asynchronous operations in your custom action might not have completed
    //You'll have to add an additional layer of logic with nimble/async or promises if you want asynchronous flow control
}).catch((err) => {
    //This is the callback if an error was encountered
    //Again, be mindful that asynchronous operations in your custom action might not have completed
    //You'll have to add an additional layer of logic with nimble/async or promises if you want asynchronous flow control
};
```
