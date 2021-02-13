const app = require('./app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const port = process.env.PORT || 5000;


// //clustering the app
// if(process.env.NODE_ENV === "production"){
//     if (cluster.isMaster) {
//         for (let i = 0; i < numCPUs; i++) {
//             cluster.fork();
//         }
//         cluster.on('exit', (worker) => {
//             cluster.fork()
//         });
//     }
//     else {
//         app.listen(port);
//         console.log('app is running on port', port);
//     }
// }
// else{
//     app.listen(port);
//     console.log('app is running on port', port);
// }

app.listen(port);
console.log('app is running on port', port);