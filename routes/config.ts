import { Isession } from "../utils/models";
import { ConfigOptions } from "cloudinary";
interface Idb {
  host: string,
  user: string,
  password: string,
  database: string
}



export let localDb: Idb = {
   host: '127.0.0.1',
   user: 'root',
   password: '',
   database: 'lawbook'
};

export let dbFree: Idb = {
  host: 'db4free.net',
  user: 'law_book',
  password: 'law_book',
  database: 'law_book'
}

export let cloudinary: ConfigOptions = {
  cloud_name: 'tjconnect',
  api_key: '556459332373436',
  api_secret: '-vfzmuQdlkLrB1rdqR5hTAf5wJg',
  provisioning_api_key: '556459332373436',
  provisioning_api_secret: '-vfzmuQdlkLrB1rdqR5hTAf5wJg'
}

export let duration = 1;
export let sessions: Array<Isession> = [];

export let rootDir = '';
export let localMongo = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';
export let mongodb =  'mongodb+srv://lawbook_user:G9yJAwyId0D0Xky5@cluster0-rrnxg.mongodb.net/<lawbook>?retryWrites=true&w=majority'
