import { createConnection, Connection, MysqlError } from "mysql";
import { Ibook, mysqlConnection } from "../../utils/models";
import csc from "country-state-city";
export class Lib {
    connection: Connection;
    constructor() {
        this.connection = createConnection(mysqlConnection);
    }

    retrieveBooks(type: string) {
        return new Promise((resolve, reject) => {
            let query = `select * from book where type ='${type}'`;
            this.connection.query(query, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }
                let books: Array<Ibook> = result;
                for (var i = 0; i < books.length; i++) {
                    books[i].country =  csc.Country.getCountryByCode(books[i].country).name;
                }
                resolve(books);

            })
        })
    }

    retrieveFreeBooks(type: string) {
        return new Promise((resolve, reject) => {
            let query = `select * from book where type ='${type}' and book.price != 'free'`;
            this.connection.query(query, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }
                let books: Array<Ibook> = result;
                for (var i = 0; i < books.length; i++) {
                    books[i].country =  csc.Country.getCountryByCode(books[i].country).name;
                }
                resolve(books);

            })
        })
    }
    retrievePaidBooks(type: string) {
        return new Promise((resolve, reject) => {
            let query = `select * from book where type ='${type}' and book.price = 'free'`;
            console.log(query);
            this.connection.query(query, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }
                let books: Array<Ibook> = result;
                for (var i = 0; i < books.length; i++) {
                    books[i].country =  csc.Country.getCountryByCode(books[i].country).name;
                }
                resolve(books);

            })
        })
    }

    retrieveBooksFromCountry (type: string, country:number) {
        return new Promise((resolve, reject) => {
            let query = `select * from book where type ='${type}' and country=${country}`;
            this.connection.query(query, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }
                let books: Array<Ibook> = result;
                for (var i = 0; i < books.length; i++) {
                    books[i].country =  csc.Country.getCountryByCode(books[i].country).name;
                }
                console.log(books);
                resolve(books);

            })
        })
    }

    retrieveBook(id: number) {
        return new Promise((resolve, reject) => {
            let query = `select * from book where id ='${id}'`;
            this.connection.query(query, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }

                
                let book: Array<Ibook> = result[0];
                resolve(book);


            })
        })
    }
    createPost( book: Ibook) {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO book set ? `;
            this.connection.query(query,book, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }
                
                resolve(result);


            })
        })
    }

    retrieveCategory(id: number) {
        return new Promise((resolve, reject) => {
            let query = `select name from  category where id='${id}'`;
            this.connection.query(query, function (err: MysqlError, result: any) {
                if (err) {
                    reject(err);
                    return;
                }

                let book: string = result[0].name;
                resolve(book);


            })
        })
    }
    
    rateBook(id: number, rating: number, userId: number) {
        return new Promise((resolve, reject)=>{
        let query = `select *  from book_shelf where book_id=${id} and user_id=${userId}`;
        this.connection.query(query,(err: MysqlError, result: any)=>{
           if(result.length > 0) {
            let sql = `UPDATE book_shelf SET likes=${rating} where user_id=${userId} and book_id=${id} `;
            console.log(sql);
            this.connection.query(sql, (err: MysqlError, result: any)=>{
                if(err){
                    reject(err);
                    
                }
                resolve(result);
                
            })
           }
           else {
               
                   resolve(`You need to have read this book before rating it.`)
               
           }
        })
    })
    }
    addToRead(id: number, userId: number) {
        let sql = `insert into book_shelf set ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql,{user_id: userId,book_id: id},(err, result)=> {
                if(err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    }
}