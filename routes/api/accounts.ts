import * as Express from 'express';
import * as mysql from 'mysql';
import {createConnection, MysqlError} from 'mysql';
import {Router} from 'express';
import {Auth} from '../auth';
const auth = new Auth();
 const  router = Router();
 const bcrypt = require('bcryptjs');
 //all resolve
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
            res.json("something went wrong!!");
            res.end();
            return;
        }
        console.log("test results",results);
        if (results.length > 0) {
            console.log("eenter");
            var test = bcrypt.compare(form.password, results[0].password);
            test.then(function(resd: any){
                if (resd) {
                    console.log("status",resd);
                  let session =  auth.createSession(results[0]);
                  
                   session.user.password = null;
                      
                    res.json(session);
                    res.end();
                }
                else if (!resd) {
                    let data = {
                        user: '',
                        response: "password is incorrect!!!!"
                    }
                    res.status(402);
                    res.json("password is incorrect!!!!");
                    res.end();
                }
               
            }, function(myErr: any){
console.log(myErr);
res.status(503);
res.json("password conversion failed");
res.end();
            })
          
        }
        else {
            let data = {
                user: '',
                response: "email is incorrect!!!!"
            }
            res.status(402);
            res.json("email is incorrect!!!!");
            res.end();
        }
      
    })
 
});


router.get('/is_logged/:session', function(req: Express.Request, res: Express.Response){
 let session: string = req.params.session;
 let result: any = auth.isAuth(session);
 res.json(result);
 res.end();
})


 module.exports = router;