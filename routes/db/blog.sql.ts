import * as mysql from 'mysql';
import {createConnection, Connection, MysqlError } from 'mysql';
import * as Express from 'express';
import { Iblog, IblogShelf } from '../../utils/models';
import {dbFree, localDb } from '../config';
import {queryUpdateAndSelect, queryInsert, sqlErrorHandler} from './common';

class BlogSQL {
    connection: Connection;
   constructor(){
    this.connection = createConnection(dbFree);
   }
  
    addToShelf (res: Express.Response, blogShelf: IblogShelf) {
     
        let query = `INSERT INTO blog_shelf set ? `;
        queryInsert(res, query,this.connection, blogShelf);     
       
      }
      retrieveFromShelf (res: Express.Response, blog_id: string, user_id: number){
          let query = `select * from blog_shelf where blog_id = '${blog_id}' and user_id = ${user_id}`;
          queryUpdateAndSelect(res, query,this.connection);
      }
      retrieveAllFromShelf (res: Express.Response, user_id: number){
        let query = `select * from blog_shelf where user_id = ${user_id}`;
        queryUpdateAndSelect(res, query,this.connection);
    }
      removeFromFavorite (res: Express.Response, blog_id: string, user_id: number){
          
        let query = `delete from blog_shelf where blog_id = '${blog_id}' and user_id = ${user_id}`;
        queryUpdateAndSelect(res, query,this.connection);
    }
   
}



export default BlogSQL;