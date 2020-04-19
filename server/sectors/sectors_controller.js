

let sectorsService = require('./sector_service');
let stockService = require('../stocks/stocks_service');

class SectorsController {
    get_names_of_sectors(){
        return sectorsService.get_names_sectors();
    }

    get_sector(sector_name) {
        return sectorsService.get_sector_by_name(sector_name);
    }


    get_sector_with_avarege_data(sector_name){
            return stockService.get_avg_value_by_sector(sector_name);

    }

    //IF STOCK IS NOT related to other sector then you can move it.
    add_stock_to_sector(sector_name,stock_name) {
        return new Promise ( (resolve, reject) => {
                stockService.get_sector_of_stock(stock_name)
                    .then(data =>
                    {
                        console.log('sector controller - add_stock_to_sector #1 -',data['sector']);
                        //UGLY - JUST NEED the first and the last
                        if (data==null || data== undefined || data ==''||data =='unassigned'||data['sector'] =='undefined') { //no other sector
                            Promise.all([sectorsService.add_stock_to_sector(sector_name,stock_name),stockService.update_stock(stock_name,"sector",sector_name)])
                                .then(values => {
                                    return resolve(values[0]);
                                }).catch(err => {
                                console.log('err - sectors controller - add_stock_to_sector',err);
                                return reject(err);

                            })
                        }
                        else {
                            console.log('err - sectors controller - add_stock_to_sector - stock is already assigned');
                            return reject('stock is already assigned');
                        }
        }).catch(err=>{  return reject(err);})

            }
                );

    }
    remove_stock_from_sector(sector_name,stock_name) {
        return new Promise ( (resolve, reject) => {
            stockService.get_sector_of_stock(stock_name)
                .then(data =>
                    {
                        console.log('sector controller - remove_stock_from_sector #1 -',data);

                        if (data==null||data== undefined || data =='') { //no other sector
                            console.log('err - stock is not related to sector', data);
                            return reject(data);

                        }
                        return Promise.all([sectorsService.remove_stock_from_sector(sector_name,stock_name),stockService.update_stock(stock_name,"sector",'undefined')])
                            .then(values => {
                                console.log('remove stock controller:',values[1]['value']);
                                return resolve(values[0]);
                            }).catch(err => {
                            console.log('err - sectors controller - remove_stock_from_sector',err);
                                return reject(values[0]);

                            })

                        });

                });
    }





    update_sector(sector_name,field,value) {
        return sectorsService.update_sector(sector_name,field,value);
    }

    get_stocks_sorted_by_field(sector_name,field) {
        return stockService.get_top_i_by_field_and_query(sector_name,field);
    }

    remove_sector(sector_name) {
        return sectorsService.remove_sector(sector_name);
    }

      insert_sector(sector_name) {
          return sectorsService.insert_sector(sector_name);
    }
}


module.exports = new SectorsController();


