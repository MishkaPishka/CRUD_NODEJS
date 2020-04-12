
let stocksDAO = require("../stocksDAO");
let stock = require('../Stock');

class stockService {

      update_stock(stock_name, stock_data) {
          console.log("service update stock data",stock_data);

          return new Promise((resolve, reject) => {
              this.search_stock_by("Name", stock_name)
                  .then(data => {
                      if (data === false) return resolve({msg: 'did not find stock'})
                      stocksDAO.update_stock(stock_name, stock_data)
                          .then(data => {
                                  console.log('in service - update complete, data:', data.value);
                                  return resolve({'stock':data.value});
                              }
                          )//Then #2
                          .catch(err => {
                              console.log("in service - update error:", err);
                              return reject(err);
                          })

                  });//THEN #1

          });//PROMISE
      }


    is_stock_a_valid_insert(stock_to_check) {
        return new Promise((resolve, reject) => {

              Promise.all(
                [
                    this.search_stock_by("Name", stock_to_check.name), this.search_stock_by("Symbol", stock_to_check.symbol), this.search_stock_by("Sector", stock_to_check.sector)
                ]).then(values => {
                    if (values[0]==null && values[1]==null && values[2] !=null ) {
                        console.log('stock service - is_stock_a_valid_insert - valid:',values);
                        return resolve(true);
                    }
                    return resolve(false);
            }).catch(err => {
                console.log('stock service - is_stock_a_valid_insert - error:');
                reject(err);
            });


        })
    }//END is_stock_a_valid_insert

    is_stock_a_valid_removal(stock_name) {
        return new Promise ( (resolve, reject) => {
            this.search_stock_by("Name",stock_name)
                .then(data=> {
                    console.log('in stock service, valid removal:', data);
                    return resolve(data)
                })
                .catch(err=>{ return reject(err);})

                })

    }//END is_stock_a_valid_insert

    add_stock(stock) {

        //check if exists and return else return error
        return new Promise((resolve, reject) => {
            this.is_stock_a_valid_insert(stock)
                .then(data=>{
                    console.log('is_stock_a_valid_insert-',data);
                    let response = {}
                    response['valid']=data;
                    if (data==false) { console.log("add_stock invalid insert -",data);return resolve(response);}
                    stocksDAO.add_stock(stock.name, stock.symbol, stock.sector)
                        .then(data => {
                            console.log('In stock service - after added stock: ' , data);
                            return resolve(stock);
                        })
                    .catch(err => {console.log("error in add_stock service",err); reject(err);})
                 })
            })


    } // end - add stock

    remove_stock(stock) {
        //Check if exists and remove or return error

        return new Promise((resolve, reject) => {
            this.is_stock_a_valid_removal(stock)
                .then (stock=>{
                    if (stock==null) {
                        console.log('remove_stock - null');

                        let er = {err: 'True',msg: 'no such stock'};
                        return resolve(er);
                    }
                stocksDAO.remove_stock(stock.Name,stock.Symbol,stock.Sector)
                    .then(data=> {
                        console.log('removed stock - ' , data);
                        return resolve({err: 'False',msg: ('removed:',data)});
                    })
                .catch(err => reject(err))
             })

        });
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

        stocksDAO.search_stock_by("Name",name)
            .then(data => {

                // return resolve(data);
                console.log(name, 'get_stock_by_name ', data);
                return resolve(data);

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
                    console.log("service -get random stock ", data);
                    return resolve(data);
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
    get_top_i_by_more_expansive(i){

        return new Promise((resolve, reject) => {
            stocksDAO.get_top_i_by_more_expansive(i)
                .then(data => {
                    console.log('service - get_top_i_by_more_expansive stocks' );
                    return resolve(data);
                })
                .catch(err => reject(err))
        })

    }
    get_top_i_by_most_cheap(i){

        return new Promise((resolve, reject) => {
            stocksDAO.get_top_i_by_most_cheap(i)
                .then(data => {
                    console.log('service - get_top_i_by_most_cheap stocks' );
                    return resolve(data);
                })
                .catch(err => reject(err))
        })

    }
     get_top_i_by_market_cap_low(i) {
         return new Promise((resolve, reject) => {
             stocksDAO.get_top_i_by_market_cap_low(i)
                 .then(data => {
                     console.log('service - get_top_i_by_market_cap_low' );
                     return resolve(data);
                 })
                 .catch(err => reject(err))
         })

     };

    //HERE
    get_top_i_by_field(i,field, ignoer_id = true) {
        return new Promise((resolve, reject) => {
            var o = {} // empty Object
            var key =field;
            o[key] = 1;
            stocksDAO.get_top_i_by_field(i,o,ignoer_id)
                .then(data => {
                    console.log('service - get_top_i_by_field:',field ,data);
                    return resolve(data);
                })
                .catch(err => reject(err))
        })

    };
    get_top_i_by_market_cap_high(i) {
        return new Promise((resolve, reject) => {
            stocksDAO.get_top_i_by_market_cap_high(i)
                .then(data => {
                    console.log('service - get_top_i_by_market_cap_high' );
                    return resolve(data);
                })
                .catch(err => reject(err))
        })
    };



} //END CLASS

module.exports = new stockService();

