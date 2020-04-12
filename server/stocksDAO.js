


const DB = require('./data/StocksDBConnector');
let db = null;
let collection_name = 'firms_data';
let Stock = require('./Stock');

// DB.connectDB().then(_=>db=DB.db_pointer.db('company_db')).catch(err=>console.log(err))
DB.connectDB().then(_=>db=DB.db_pointer.collection(collection_name)).catch(err=>console.log(err))

class stocksDAO {

     update_stock(stock_name, stock_data)
     {
         let r = {}
         r[stock_data['field']]=stock_data[stock_data['field']];


         // return  db.findOneAndUpdate({Name:'"'+stock_name+'"'}, {$set: r});
          return    db.findOneAndUpdate({"Name":stock_name}, {$set: stock_data});


    }

    get_random_stock() {
        return new Promise ( (resolve, reject) => {
            db.count().then(data=>{
                var n = data;
                var r = Math.floor(Math.random() * n);
                resolve( db.find({},{projection:{ _id: 0 }}).limit(1).skip(r).toArray());

            }).catch(err=>resolve(err))
        })

    }


      get_top_i_by_most_cheap(i) {

          return db.find().sort({ "Price": -1 }).limit(i).toArray();
    }

     get_top_i_by_name(i) {
          return db.find({},{projection:{ _id: 0 }}).sort({ Name: 1 }).limit(i).toArray();
    }

      get_top_i_by_more_expansive(i) {
          return db.find().sort({ "Price": 1 }).limit(i).toArray();


      }

    get_top_i_by_market_cap_high(i) {
        return db.find().sort({ "Market Cap": -1 }).limit(i).toArray();


    }
    get_top_i_by_market_cap_low(i) {
        return db.find().sort({ "Market Cap": 1 }).limit(i).toArray();


    }
    get_top_i_by_field(i, json_field_query,ignoer_id) {
         let val = 0;
         if( ignoer_id==false ) {
             val =1;
         }
        return db.find({},  {projection:{ _id: val }}).sort(json_field_query ).limit(i).toArray();


    }
    add_stock(stock_name,stock_symbol,stock_sector) {
        return  db.insertOne({Name: stock_name, Symbol: stock_symbol, Sector: stock_sector})


    }

    search_stock_by (field,value) {
        console.log("search stock by:",field,value);
        var query = {};
        query[field] = value
        console.log("search stock by - ",query);

        return db.findOne(query);
    }

    remove_stock(stock_name,stock_symbol,stock_sector) {
         console.log("YYY:",stock_name,stock_symbol,stock_sector);
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
        return db.find({},  {projection:{ _id: 0 }}).toArray();


    }



}

module.exports = new stocksDAO();