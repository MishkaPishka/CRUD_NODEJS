console.log('DB');

const MongoClient = require('mongodb').MongoClient;
class DB {

    constructor(dbAddress){
        this.dbAddress = dbAddress;
        this.db = undefined;
    }

    connectDB(){
        console.log('connectDB');

        return new Promise((resolve, reject) =>{

            MongoClient.connect(this.dbAddress, {useNewUrlParser: true, useUnifiedTopology: true}) //returns a promise, or add callback - (err, database) =>  {
                .then(database => {
                    this.db = database.db('company_db');
                    console.log('connected to database - company_db');
                    return resolve(true);
                }).catch(err=> {console.log('error connect to database - company_db',err); reject(err);})

        })

    }
}


module.exports = new DB('mongodb://localhost/');