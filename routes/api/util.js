"use strict";
exports.__esModule = true;
var country_state_city_1 = require("country-state-city");
var express = require("express");
var router = express.Router();
router.get('/get_all_countries', function (req, res) {
    var countries = country_state_city_1["default"].getAllCountries();
    res.json(countries);
    res.end();
});
module.exports = router;
//# sourceMappingURL=util.js.map