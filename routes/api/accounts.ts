import * as Express from 'express';
import * as mysql from 'mysql';
import {createConnection, MysqlError} from 'mysql';
import {Router} from 'express';
import {Auth} from '../auth';
const auth = new Auth();
 const  router = Router();
 const bcrypt = require('bcryptjs');
 const saltRounds = bcrypt.genSaltSync(10);
 const cryptoRandomString = require('crypto-random-string');
 import {dbFree, localDb } from '../config';
import { Iuser } from '../../utils/models';
 var connection = createConnection(dbFree);


 router.post('/login', function (req: Express.Request, res: Express.Response) {
     let form: Iuser;
    form = <Iuser>req.body;
    console.log(form);
    var query = "SELECT * FROM user WHERE email = " + mysql.escape(form.email);
    connection.query(query, function (err: MysqlError, results: any) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json("something went wrong!!!");
            res.end();
            return;
        }
        if (results.length > 0) {
            var test = bcrypt.compare(form.password, results[0].password);
            if (test) {
                console.log(test);
              let session =  auth.createSession(results[0]);
              
               session.user.password = null;
                  
                res.json(session);
                res.end();
            }
            else if (!test) {
                let data = {
                    user: '',
                    response: "password is incorrect!!!!"
                }
                res.json(data);
                res.end();
            }
        }
        else {
            let data = {
                user: '',
                response: "email is incorrect!!!!"
            }
            res.json(data);
            res.end();
        }
    })
 
});


 module.exports = router;