import * as Express from 'express';
import {Router} from 'express';
import {Auth } from '../routes/auth';
import { Iuser, Isession } from '../utils/models';
const auth = new Auth();
 const  router = Router();
var root = require('./config').rootDir;


router.get('/', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog.html');
});
router.get('/top_post', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/top.html');
});
router.get('/favorites', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/favorite.html');
});
router.get('/all', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/all.html');
});
router.get('/author/:session', function (req: Express.Request, res: Express.Response) {
   console.log(req.params.session);
   let user: any;
   
 user = auth.isAuth((req.params.session).trim());
 console.log('user', user);
 if(user){
if(user.user.type == "author"){
    console.log("registered");
    res.sendFile(root + '/pages/blog/author.html');
}
else{
    res.sendfile(root + '/pages/blog/become_an_author.html' )
}
    
 }
 else{
    res.redirect('/login');
 }
  
   
});

router.get('/content/:data', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/content.html');
});

module.exports = router;
