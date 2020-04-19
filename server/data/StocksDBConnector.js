/*
const MongoClient = require('mongodb').MongoClient;
class DB {



    constructor(dbAddress){
        this.dbAddress = dbAddress;
        this.db_pointer = undefined;
    }
    connectDB(){
        return new Promise((resolve, reject) =>{
            MongoClient.connect('mongodb://localhost/company_db') //returns a promise, or add callback - (err, database) =>  {
                .then(database => {
                    this.db_pointer=database.db('company_db');
                    // this.db_pointer = database;
                    console.log('connecting to stock database - company_db');
                    console.log(database);

                    return resolve();
                }).catch(err=> reject(err))
        })
    }
}

module.exports = new DB();*/
