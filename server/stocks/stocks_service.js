


const DB = require('../data/DB')
const stocksDAO = require("./stocksDAO");
const stock = require('./Stock');
const stock_utils = require('./stocks_utils/utils')



class stockService {
        //At the moment even number fields are regarded as strings
    //TODO - parse fields .
      update_stock(stock_name, stock_field, stock_value) {
          return new Promise((resolve, reject) => {
                  console.log('stockService - update_stock:',stock_name, stock_field, stock_value)
                      let update_value_query = stock_utils.create_field_data(stock_field,stock_value);
                      stocksDAO.update_stock(stock_name, update_value_query)
                          .then(data => {
                              let stock =  stock_utils.cleanStock(data.value);
                              console.log('in service - update complete, data:', stock);
                                  return resolve(data);
                              }
                          )//Then #2
                          .catch(err => {
                              console.log("in service - update error:", err);
                              return reject(err);
                          })

                  });//THEN #1


      }

    get_stocks_by_sector(sector) {
          return new Promise ( (resolve, reject) => {
              stocksDAO.get_stocks_by_sector({'sector':sector})
                  .then(data => {
                      console.log('stocks service - get_stocks_by_sector',data);
                      return resolve(data);
                  })
                  .catch(err=>
                      {
                          return reject(err);
                      }
                  )
          })

    }



    add_stock(stock) {

        //check if exists and return else return error
        return new Promise((resolve, reject) => {

                    stocksDAO.add_stock(stock.name, stock.symbol, stock.sector)
                        .then(data => {
                            console.log('In stock service - after added stock: ' , data);
                            return resolve(stock);
                        })
                    .catch(err => {console.log("error in add_stock service",err); reject(err);})
         })



    } // end - add stock

    remove_stock(stock) {
        //Check if exists and remove or return error

        return new Promise((resolve, reject) => {

                stocksDAO.remove_stock(stock)
                    .then(data=> {
                        console.log('removed stock - ' , data);
                        return resolve({err: 'False',msg: ('removed:',data.value)});
                    })
                .catch(err => reject(err))
             })

        }

    search_stock_by_query(query){
        return new Promise ( (resolve, reject) => {
            console.log("in stock service- search stock by:",query);
            stocksDAO.search_stock_by_query(query)
                .then(data=>{    console.log('search_stock_by, data:',data);   resolve(data)})
                .catch(err=>{ reject(err)});
        })

    }
    search_stock_by(field,value){
        return new Promise ( (resolve, reject) => {
            console.log("in stock service- search stock by:",field,value);
            stocksDAO.search_stock_by(field,value)
                .then(data=>{    console.log('search_stock_by, data:',data);   resolve(data)})
                .catch(err=>{ reject(err)});
        })

    }
    get_stock_by_name(name) {
    return new Promise((resolve, reject) => {

        stocksDAO.search_stock_by("name",name)
            .then(data => {

                // return resolve(data);
                console.log(name, 'get_stock_by_name ', data);
                let stock =  stock_utils.cleanStock(data);

                return resolve(stock);

            }).catch(err => reject(err))
    })

}
    get_list_all() {
        return new Promise((resolve, reject) => {
            stocksDAO.get_list_all()
                .then(data => {
                   console.log('get_list_all stocks' );
                    return resolve(data);
                })
                .catch(err => reject(err))
        })


    }
    get_random_stock(){
        return new Promise((resolve, reject) => {
            stocksDAO.get_random_stock()
                .then(data => {
                    let stock =  stock_utils.cleanStock(data[0]);
                    console.log("service -get random stock ", stock);
                    return resolve(stock);
                })
                .catch(err => reject(err))
        })


    }
    get_top_i_by_name(i){

        return new Promise((resolve, reject) => {
            stocksDAO.get_top_i_by_name(i)
                .then(data => {
                    console.log("service ", data)
                    return resolve(data);
                })
                .catch(err => reject(err))
        })
    }

    get_top_i_by_field(field,i=0, ignoer_id = true) {

        return new Promise((resolve, reject) => {
            var o = {} // empty Object
            var key =field;
            o[key] = -1;
            stocksDAO.get_top_i_by_field(i,o,ignoer_id)
                .then(data => {
                    console.log('service - get_top_i_by_field:',field ,data);
                    return resolve(data);
                })
                .catch(err => reject(err))
        })

    };

    get_top_i_by_field_and_query(query,field,i=0, ignoer_id = true) {

        return new Promise((resolve, reject) => {
            var o = {} // empty Object
            var key =field;
            o[key] = -1;
            stocksDAO.get_top_i_by_field_and_query(query,i,o,ignoer_id)
                .then(data => {
                    console.log('service - get_top_i_by_field:',field ,data);
                    return resolve(data);
                })
                .catch(err => reject(err))
        })

    };

   get_avg_value_by_sector(sector_name) {
        let group_value = {}
        group_value['sector'] = sector_name;
        return new Promise ( (resolve, reject) => {
            stocksDAO.get_avg_values(group_value)
                .then(data => {
                    console.log('service - get_avg_value_by_sector:',data);
                    resolve(data[0])})
                .catch(err => {reject(err);})


        })
    }

    get_sector_of_stock(stock_name) {
        return stocksDAO.get_stock_sector(stock_name);
    }
    header_to_titles_mapping() {
        let header_mapping = {}
        header_mapping['52_week_high'] = '52 Week High';
        header_mapping['52_week_low'] = '52 Week Low';
        header_mapping['dividend_yield'] = 'Dividend Yield';
        header_mapping['ebitda'] = 'EBITDA';
        header_mapping['earning_to_share'] = 'Earnings/Share';
        header_mapping['market_cap'] = 'Market Cap';
        header_mapping['name'] = 'Name';
        header_mapping['price'] = 'Price';
        header_mapping['price_to_book'] = 'P/B';
        header_mapping['pe'] = 'P/E';
        header_mapping['price_to_sales'] = 'Price/Sales';
        header_mapping['sec_fillings'] = 'SEC Fillings';
        header_mapping['sector'] = 'Sector';
        header_mapping['symbol'] = 'Symbol';
        return header_mapping;
    }
} //END CLASS

module.exports = new stockService();
