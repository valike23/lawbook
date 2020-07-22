
import { Ipersonality } from '../../utils/models';
import { mongodb, localMongo } from '../config';
import * as express from 'express';
import HomeDatabase from '../db/home';
const router = express.Router();
let homeDb = new HomeDatabase(mongodb , 'lawbook');

router.post('/personalities',  (req: express.Request, res: express.Response) => {
    let personalities: Array<Ipersonality> = req.body;
    
   homeDb.addPersonalities(res, personalities); 
   
});
router.get('/personalities',  (req: express.Request, res: express.Response) => {
      
   homeDb.getPersonalities(res); 
   
});




module.exports = router;