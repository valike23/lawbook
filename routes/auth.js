"use strict";
exports.__esModule = true;
var config_1 = require("../routes/config");
var cryptoRandomString = require('crypto-random-string');
var Auth = (function () {
    function Auth() {
    }
    Auth.prototype.isAuth = function (sessionString) {
        console.log("sessions", config_1.sessions);
        if (config_1.sessions.length < 1) {
            return false;
        }
        for (var i = 0; i < config_1.sessions.length; i++) {
            console.log("user", sessionString, sessionString.length);
            console.log("provider", config_1.sessions[i].session, config_1.sessions[i].session.length);
            if (config_1.sessions[i].session == sessionString) {
                return config_1.sessions[i];
                break;
            }
        }
        return false;
    };
    Auth.prototype.isUnique = function (sessionString) {
        if (!this.isAuth(sessionString)) {
            return true;
        }
        else {
            return false;
        }
    };
    Auth.prototype.refresh = function () {
        var current = Date.now();
        console.log(current);
        if (config_1.sessions.length > 0) {
            for (var i = 0; i < config_1.sessions.length; i++) {
                if (config_1.sessions[i].duration < current) {
                    console.log(config_1.sessions.splice(i, 1));
                    this.refresh();
                    break;
                }
            }
            return "session refresh successful";
        }
        else {
            return "no session available";
        }
    };
    Auth.prototype.update = function (session) {
        for (var i = 0; i < config_1.sessions.length; i++) {
            if (session.user.id == config_1.sessions[i].user.id) {
                config_1.sessions[i] = session;
                return true;
                break;
            }
        }
        return false;
    };
    Auth.prototype.createSession = function (user) {
        console.log(config_1.sessions);
        var random = cryptoRandomString({ length: 20 });
        var session;
        if (this.isUnique(random)) {
            session = {
                user: user,
                session: random,
                duration: Date.now() + config_1.duration * 60000
            };
            config_1.sessions.push(session);
            return session;
        }
        else {
            this.createSession(user);
        }
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map