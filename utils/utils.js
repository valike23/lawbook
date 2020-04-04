let config = require('../routes/config');


let utils = {
    db: config.localDB,
    duration: config.duration
}

module.exports = utils;