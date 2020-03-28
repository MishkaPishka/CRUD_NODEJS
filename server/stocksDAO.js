const DB = require('./data/StocksDBConnector');
let db = null;
let collection_name = 'companys';

// DB.connectDB().then(_=>db=DB.db_pointer.db('company_db')).catch(err=>console.log(err))
DB.connectDB().then(_=>db=DB.db_pointer.collection(collection_name)).catch(err=>console.log(err))

class stocksDAO {



    add_stock(stock_name,stock_symbol,stock_sector) {
        return db.insert({Name: stock_name, Symbol: stock_symbol, Sector: stock_sector});
    }

    remove_stock(stock_name,stock_symbol,stock_sector) {
        return  db.findOneAndDelete({
            Name: stock_name,
            Symbol: stock_symbol,
            Sector: stock_sector
        })

    }

    get_sectors_by_name() {
        return db.distinct('Sector');

    }



    get_stock_by_name(name) {
        return db.findOne({'Name': name});

    }

    get_stocks_by_sector(sector_name) {
        return new  db.find({Sector: sector_name}).toArray();
    }


    get_list_all() {
        return db.find().toArray();


    }



}

module.exports = new stocksDAO();