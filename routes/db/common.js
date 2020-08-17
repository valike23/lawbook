"use strict";
exports.__esModule = true;
function queryUpdateAndSelect(res, query, connection) {
    connection.query(query, function (err, result) {
        if (err) {
            res.status(503);
            res.json(err.message);
            console.log(err);
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
            res.status(503);
            res.json(err.message);
            console.log(err);
            return;
        }
        res.json(result);
        res.end();
    });
}
exports.queryInsert = queryInsert;
//# sourceMappingURL=common.js.map