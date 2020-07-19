import {Iuser, Isession} from '../utils/models';
import {duration, sessions} from '../routes/config';
const cryptoRandomString = require('crypto-random-string');

export class Auth {
    
    constructor() {
        
    }
    isAuth( sessionString: string): Isession | boolean{
        console.log("sessions", sessions);
        if(sessions.length < 1){
            return false
        }
        for (var i = 0; i < sessions.length; i++) {
            console.log("user", sessionString, sessionString.length);
            console.log("provider", sessions[i].session, sessions[i].session.length)

            if (sessions[i].session == sessionString) {
                return sessions[i];
                break;
            }
           
        }
        return false;
        
    }

    isUnique( sessionString: string): boolean{

        if (!this.isAuth(sessionString)) {
            return true;
        }
        else {
            return false;
        }
    }

    refresh(): string{
        let current = Date.now();
        console.log(current);
        if (sessions.length > 0) {
            for (var i = 0; i < sessions.length; i++) {
                if (sessions[i].duration < current) {
                    console.log(sessions.splice(i, 1));
                    this.refresh();
                    break;
                }
            }
            return "session refresh successful";
        }
        else {
            return "no session available";
        }
    }

    update(session: Isession): boolean {
        for (var i = 0; i < sessions.length; i++) {
            if (session.user.id == sessions[i].user.id) {
               sessions[i] = session;
                return true;
                break;
            }

        }
        return false;
    }
    createSession(user: Iuser): Isession{
        console.log(sessions);
        let random = cryptoRandomString({ length: 20 });
        let session: Isession;
        if (this.isUnique(random)) {
            session = {
                user: user,
                session: random,
                duration: <number>Date.now() + duration * 60000
            }
            sessions.push(session);
            return session;
        }
        else {
           this.createSession(user);
        }
    }
}
