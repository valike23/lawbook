
import { Ipersonality } from '../../utils/models';
import { mongodb, localMongo } from '../config';
import * as express from 'express';
import HomeDatabase from '../db/home';
import BlogDatabase  from '../db/blog';
const router = express.Router();
let homeDb = new HomeDatabase(localMongo , 'lawbook');
let blogDb = new BlogDatabase(localMongo , 'lawbook');

router.post('/personalities',  (req: express.Request, res: express.Response) => {
    let personalities: Array<Ipersonality> = req.body;
    
   homeDb.addPersonalities(res, personalities); 
   
});
router.get('/personalities',  (req: express.Request, res: express.Response) => {
      
   homeDb.getPersonalities(res); 
   
});

router.get('/blog',  (req: express.Request, res: express.Response) => {
      
   blogDb.getTopBlogs(res, 1); 
   
});




module.exports = router;