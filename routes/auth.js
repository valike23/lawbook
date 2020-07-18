"use strict";
exports.__esModule = true;
var config_1 = require("../routes/config");
var cryptoRandomString = require('crypto-random-string');
var Auth = (function () {
    function Auth() {
    }
    Auth.prototype.isAuth = function (sessionString) {
        if (auth.sessions.length < 1) {
            return false;
        }
        for (var i = 0; i < auth.sessions.length; i++) {
            console.log("user", sessionString);
            console.log("provider", auth.sessions[i].session);
            if (auth.sessions[i].session == sessionString) {
                return auth.sessions[i];
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
        if (auth.sessions.length > 0) {
            for (var i = 0; i < auth.sessions.length; i++) {
                if (auth.sessions[i].duration < current) {
                    console.log(auth.sessions.splice(i, 1));
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
        for (var i = 0; i < auth.sessions.length; i++) {
            if (session.user.id == auth.sessions[i].user.id) {
                auth.sessions[i] = session;
                return true;
                break;
            }
        }
        return false;
    };
    Auth.prototype.createSession = function (user) {
        var random = cryptoRandomString({ length: 20 });
        var session;
        if (this.isUnique(random)) {
            session = {
                user: user,
                session: random,
                duration: Date.now() + config_1.duration * 60000
            };
            Auth.sessions.push(session);
            return session;
        }
        else {
            this.createSession(user);
        }
    };
    Auth.sessions = [];
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map