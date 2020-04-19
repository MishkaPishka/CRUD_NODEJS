/*
const MongoClient = require('mongodb').MongoClient;
class SectorsDBConnector {


    constructor(dbAddress){
        this.dbAddress = dbAddress;
        this.db_pointer = undefined;
    }
    connectDB(){
        return new Promise((resolve, reject) =>{
            MongoClient.connect('mongodb://localhost') //returns a promise, or add callback - (err, database) =>  {
                .then(database => {
                    this.db_pointer=database.db('company_db');
                    console.log('connecting to database - company_db');
                    console.log(database);

                    return resolve();
                }).catch(err=> reject(err))
        })
    }
}



module.exports = new SectorsDBConnector();*/
