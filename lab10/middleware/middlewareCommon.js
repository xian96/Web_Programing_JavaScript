// const express = require("express");
// const app = express();

// module.exports = app;

// // 1. One which will count the number of requests made to your website
// let currentNumberOfRequests = 0;
// function countRequest(request, response, next) {
//     currentNumberOfRequests++;
//     console.log('There have now been ' + currentNumberOfRequests + ' requests made to the website.');
//     next();
// }
// app.use(countRequest);

// // 2. One which will count the number of requests that have been made to the current path
// const pathsAccessed = {};
// function countEachPath(request, response, next) {
//     if (!pathsAccessed[request.path]) pathsAccessed[request.path] = 0;

//     pathsAccessed[request.path]++;

//     console.log('There have now been ' + pathsAccessed[request.path] + ' requests made to ' + request.path);
//     next();
// }
// app.use(countEachPath);
