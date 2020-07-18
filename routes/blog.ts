import * as Express from 'express';
import {Router} from 'express';
 const  router = Router();
var root = require('./config').rootDir;


router.get('/', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog.html');
});
router.get('/top_post', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/top.html');
});
router.get('/favorites', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/favorites.html');
});
router.get('/all', function (req: Express.Request, res: Express.Response) {
    res.sendFile(root + '/pages/blog/all.html');
});
router.get('/author/:session', function (req: Express.Request, res: Express.Response) {
   console.log(req.params.session);
   res.redirect('/login');
   // res.sendFile(root + '/pages/blog/author.html');
});

module.exports = router;
