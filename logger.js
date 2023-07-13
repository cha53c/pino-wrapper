const pino = require('pino');
const LOG_PATH = process.env.LOG_PATH || `${__dirname}/smpp-server.log`;
const targets = [];

if (process.env.LOG_2_FILE) {
    console.log('logging to file = true');
    console.log(`log path: ${LOG_PATH}`);
    targets.push({
        target: 'pino/file',
        options: { destination: LOG_PATH },
    });
}

if (process.env.LOG_2_STDOUT) {
    console.log('logging to stdout = true')
    targets.push({ target: 'pino/file', });
}

// TODO test with remote logging
if (process.env.LOG_2_REMOTE){
    console.log('logging to remote = true');
    targets.push(    {
        target: '@logtail/pino',
        options: { sourceToken: process.env.LOGTAIL_TOKEN },
      },);
}

console.log(JSON.stringify(targets));


module.exports = pino(
    {
        level: process.env.LOG_LEVEL || 'debug',
        timestamp: pino.stdTimeFunctions.isoTime,
        transport: {
            targets: targets
        }    
    }
);
