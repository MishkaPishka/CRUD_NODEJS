


const DB = require('../data/DB')
let sectorsDB = DB.db.collection('sectors');

// sectorsDB.createIndex( { "sector_name": 1 }, { unique: true } )
//db.getCollection('companys').distinct('Sector').forEach(doc => db.getCollection('sectors').insert({sector_name:doc}))

// db.getCollection('sectors').update({"sector_name":data['Sector']},{$push: {"companys":data['Name']}})
//add fields

class sectorsDAO {

    //sectorsDB = DB.db.collection('companys');
    update_sector(sector_name, update) {
        return sectorsDB.findOneAndUpdate({"sector_name": sector_name}, {$set: update}, {returnOriginal: false});
    }

    get_names_sectors() {
        return sectorsDB.distinct('sector_name');
    }

    get_sector(sector_query) {
        return sectorsDB.findOne(sector_query, {projection: {_id: 0}});
    }

    get_stocks_by_sector(sector_name) {
        return sectorsDB.find({sector_name: sector_name}, {projection: {companys: 1}}).toArray();

    }



    remove_sector(query) {
        return sectorsDB.findOneAndDelete(query);
    }

    remove_stock_from_sector(sector, stock) {

        return sectorsDB.update(
            {sector_name: sector},
            {$pull: {companys: { $in: [ stock ] } } },{multi:true}
        )
    }

    remove_stock_from_sector_by_stock_name(stock) {
        return sectorsDB.update(
            {},
            {$pull: {companys: { $in: [ stock ] } }},{multi:true}
        )

    }

    add_stock_to_sector(sector, stock) {
        return sectorsDB.update(
            {sector_name: sector},
            {$push: {companys: stock} }
        )

    }
    insert_sector(sector_name) {
        return sectorsDB.insertOne({sector_name:sector_name,companys:[],description:''});

    }


}
module.exports = new sectorsDAO();
