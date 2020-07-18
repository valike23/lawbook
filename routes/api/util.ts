import {ICity, IState, ICountry} from 'country-state-city';
import csc from 'country-state-city';

import * as express from 'express';
const router = express.Router();

router.get('/get_all_countries',  (req: express.Request, res: express.Response) => {
  let countries = csc.getAllCountries();
  res.json(countries);
  res.end();
   
});

module.exports = router;