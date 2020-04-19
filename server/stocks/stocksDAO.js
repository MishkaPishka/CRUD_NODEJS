

const DB = require('../data/DB')
let Stock = require('./Stock');

let stocksDB = DB.db.collection('firms_data');

class stocksDAO {
    // create_index() {
    //     stocksDB.createIndex( { "Name": 1, "Symbol": 1 }, { unique: true } )
    // }


    update_stock(stock_name, stock_data) {
        console.log("dao - stock stock_data:", stock_data, {"name": stock_name});

        return stocksDB.findOneAndUpdate({"name": stock_name}, {$set: stock_data}, {returnOriginal: false});


    }

    get_random_stock() {
        return stocksDB.aggregate([{$sample: {size: 1}}]).toArray()

    }

    search_stock_by_query(query) {
        return stocksDB.findOne(query);
    }


    get_top_i_by_name(i) {
        return stocksDB.find({}, {
            projection: {
                _id: 0,
                name: 1,
                sector: 1,
                symbol: 1
            }
        }).sort({name: 1}).limit(i).toArray();
    }


    get_top_i_by_field_and_query(query, i, json_field_query, ignoer_id = true) {
        return stocksDB.find(query, {projection: {_id: ignoer_id}}).sort(json_field_query).limit(i).toArray();

    }

    get_top_i_by_field(i, json_field_query, ignoer_id) {
        let val = 0;
        if (ignoer_id == false) {
            val = 1;
        }
        return stocksDB.find({}, {projection: {_id: val}}).sort(json_field_query).limit(i).toArray();


    }

    add_stock(stock_name, stock_symbol, stock_sector) {
        return stocksDB.insertOne({name: stock_name, symbol: stock_symbol, sector: stock_sector})


    }

    search_stock_by(field, value) {
        console.log("search stock by:", field, value);
        var query = {};
        query[field] = value
        console.log("search stock by - ", query);

        return stocksDB.findOne(query);
    }

    remove_stock(stock_name, stock_symbol, stock_sector) {
        return stocksDB.findOneAndDelete({name: stock_name})

    }

    get_sectors_by_name() {
        return stocksDB.distinct('Sector');

    }


    get_stock_by_name(name) {
        return stocksDB.findOne({'name': name});

    }

    get_stocks_by_sector(sector_name) {
        return stocksDB.find(sector_name).toArray();
    }


    get_list_all() {
        return stocksDB.find({}, {projection: {_id: 0}}).toArray();
    }

    get_avg_values(group_value) {
        return stocksDB.aggregate([
            { $match : group_value } ,
                    { $group: { _id: null, price:  { $avg: "$price"}
                                            ,market_cap: { $avg:"$market_cap"}
                                                 ,dividend_yield: { $avg:"$dividend_yield"}}
                    }, { $project :{_id : 0,price:{$round: ["$price",2] },market_cap:{$round: ["$market_cap",2] },dividend_yield:{$round: ["$dividend_yield",2] } }}
            ]).toArray()
        }
    get_stock_sector(stock_name) {
         return stocksDB.findOne({'name':stock_name}, {projection: {sector: 1,_id:0}});
    }

}



    module.exports = new stocksDAO();