
const DB = require('./server/data/DB')

DB.connectDB()
    .then(_=>{
        const WebServer = require('./bin/www')

        WebServer.listenOnPort('3000')
        console.log('Listening in port 3000')
        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        })
    }).catch(err => console.log(err))