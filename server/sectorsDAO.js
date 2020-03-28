const SectorsDBConnector = require('./data/SectorsDBConnector');
let db = null;
let collection_name = 'companys';

SectorsDBConnector.connectDB().then(_=>db=SectorsDBConnector.db_pointer.collection(collection_name)).catch(err=>console.log(err))

class sectorsDAO {

    get_sectors_by_name() {

        return new Promise((resolve, reject) => {
            db.distinct('Sector')
                .then(data => {
                    console.log(data);
                    resolve(data);
                });

        });
    }


    get_stocks_by_sector(sector_name) {
        return new Promise((resolve, reject) => {
            db.find({Sector: sector_name}).toArray()
                .then(data => {
                    resolve(data)
                });
        });


    }
}
module.exports = new sectorsDAO();