import {Iuser, Isession} from '../utils/models';
import {duration} from '../routes/config';
const cryptoRandomString = require('crypto-random-string');

export class Auth {
    static sessions: Array<Isession> = [];
    constructor() {
        
    }
    isAuth( sessionString: string): boolean | Isession{
        if(auth.sessions.length < 1){
            return false
        }
        for (var i = 0; i < auth.sessions.length; i++) {
            console.log("user", sessionString);
            console.log("provider", auth.sessions[i].session)
            if (auth.sessions[i].session == sessionString) {
                return auth.sessions[i];
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
    }

    update(session: Isession): boolean {
        for (var i = 0; i < auth.sessions.length; i++) {
            if (session.user.id == auth.sessions[i].user.id) {
                auth.sessions[i] = session;
                return true;
                break;
            }

        }
        return false;
    }
    createSession(user: Iuser): Isession{
        let random = cryptoRandomString({ length: 20 });
        let session: Isession;
        if (this.isUnique(random)) {
            session = {
                user: user,
                session: random,
                duration: <number>Date.now() + duration * 60000
            }
            Auth.sessions.push(session);
            return session;
        }
        else {
           this.createSession(user);
        }
    }
}
