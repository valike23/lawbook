"use strict";
exports.__esModule = true;
function queryUpdateAndSelect(res, query, connection) {
    connection.query(query, function (err, result) {
        if (err) {
            sqlErrorHandler(res, err);
            return;
        }
        res.json(result);
        res.end();
    });
}
exports.queryUpdateAndSelect = queryUpdateAndSelect;
function queryInsert(res, query, connection, data) {
    connection.query(query, data, function (err, result) {
        if (err) {
            sqlErrorHandler(res, err);
            return;
        }
        res.json(result);
        res.end();
    });
}
exports.queryInsert = queryInsert;
function sqlErrorHandler(res, error) {
    res.status(503);
    res.json({ msg: error.message,
        code: error.code });
    console.log(error);
}
exports.sqlErrorHandler = sqlErrorHandler;
//# sourceMappingURL=common.js.map