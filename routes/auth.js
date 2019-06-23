let auth = {
    sessions: [],
    
    isAuth: function (userSession) {
        let allSessions = this.sessions;
        if (allSessions.length < 1) {
            return false;
        }

        for (var i = 0; i < allSessions.length; i++) {
            console.log("user", userSession);
            console.log("provider", allSessions[i].session)
            if (allSessions[i].session == userSession) {
                return allSessions[i];
                break;
            }
           
        }
        return false;
        
    },

    isUnique: function (UserSession) {
        if (!this.isAuth(UserSession)) {
            return true;
        }
        else {
            return false;
        }
    },

    refresh: function () {
        let current = Date.now();
        if (this.sessions > 0) {
            for (var i = 0; i < this.sessions.length; i++) {
                if (this.sessions.duration < current) {
                    console.log(this.sessions.splice(i, 1));
                    this.refresh();
                    break;
                }
            }
        }
        else {
            return "no session available";
        }
    },
    update: function (user) {
        for (var i = 0; i < this.sessions.length; i++) {
            if (user.user.id == this.sessions[i].user.id) {
                this.sessions[i] = user;
                return true;
                break;
            }

        }
        return false;
    }
}


module.exports = auth;