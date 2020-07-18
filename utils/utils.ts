import {dbFree, mongodb, duration, localDb, localMongo } from '../routes/config'


let utils = {
    db: dbFree,
    duration: duration,
    mongoConnStr: localMongo
}

module.exports = utils;