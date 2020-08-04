let sectorsService = require('./sector_service');
let stockService = require('../stocks/stocks_service');
let usersService = require('../users_info_page/users_service')

class sectors_controller {
    get_names_of_sectors(){
        return sectorsService.get_names_sectors();
    }

    get_sector(sector_name) {
        return sectorsService.get_sector_by_name(sector_name);
    }


    get_sector_with_avarege_data(sector_name){
            return stockService.get_avg_value_by_sector(sector_name);

    }
     get_stocks_by_sector(name) {
          return stockService.get_stocks_by_sector(name);
    }
    //IF STOCK IS NOT related to other sector then you can move it.
    add_stock_to_sector(sector_name,stock_name) {
        return new Promise((resolve, reject) => {
            stockService.get_stock_by_name(stock_name)
                .then(data => {
                    console.log('!@######', data);
                    if (data == null) {
                        return reject("Stock doesn't exist")
                    } else if (data['sector'] !== 'undefined' && data['sector'] !== sector_name ) {
                        reject('Stock is assigned to a different sector,change to unassigned')
                    }
                    stockService.update_stock(stock_name, "sector", sector_name)
                        .then(data => {
                            resolve(data.value)
                        })
                }).catch(err => reject(err))

        })
    }



    remove_stock_from_sector(sector_name,stock_name) {
        return new Promise ( (resolve, reject) => {
                    stockService.update_stock(stock_name, "sector", 'undefined')
                        .then(data => {
                            if (data.value==null) {
                                return reject("Stock doesn't exist");
                            }
                            resolve(data);
                        }).catch(err=>reject(err))
                })
                        // return Promise.all([sectorsService.remove_stock_from_sector(sector_name,stock_name),stockService.update_stock(stock_name,"sector",'undefined')])
                        //     .then(values => {
                        //         console.log('remove stock controller:',values[1]['value']);
                        //         return resolve(values[0]);
                        //     }).catch(err => {
                        //     console.log('err - sectors controller - remove_stock_from_sector',err);
                        //         return reject(values[0]);
                        //
                        //     })




    }





    update_sector(sector_name,field,value) {
        return sectorsService.update_sector(sector_name,field,value);
    }

    get_stocks_sorted_by_field(sector_name,field) {
        return stockService.get_top_i_by_field_and_query(sector_name,field);
    }

    //TODO
    remove_sector(sector_name,u_mail) {
        return new Promise ( (resolve, reject) => {
            stockService.get_stocks_by_sector(sector_name)
                .then(data=>{
                    console.log('stocks by sector:***',data)
                    if (data.length > 0)  {

                        return reject("Sector contains stocks");
                    }

                    usersService.user_remove_sector(u_mail,sector_name)
                        .then(_=>{
                            sectorsService.remove_sector(sector_name)
                                .then(data=>{

                                    return resolve(data.value);
                                }).catch(err=> {reject(err);})
                        })

                })


        })

    }

    unfollow_sector(umail,sector_name) {
        return new Promise ( (resolve, reject) => {

            usersService. change_status_follow_sector(umail,false,sector_name)
                .then(data=>{
                    console.log('hhhhhh',data)
                    return resolve(data);

                }).catch(err=> {reject("Could not unfollow sector ");})
        })

    }
    follow_sector(umail,sector_name) {
        return new Promise ( (resolve, reject) => {

            usersService. change_status_follow_sector(umail,true,sector_name)
                .then(data=>{
                    console.log('hhhhhh',data)
                    return resolve(data);

                }).catch(err=> {reject("Could not insert sector - check if exist ");})
        })

    }
      insert_sector(sector_name,u_mail) {
        return new Promise ( (resolve, reject) => {
            if (sector_name== undefined || sector_name =='' ){
                return reject('invalid name');
            }
            sectorsService.insert_sector(sector_name)
                .then(data=>{
                    delete data.ops[0]["_id"];
                    let sector_data = data.ops[0]

                    usersService.user_add_sector(u_mail,sector_name)
                        .then(_=>{

                            return resolve(sector_data);

                        })
                }).catch(err=> {reject("Could not insert sector - check if exist ");})
        })

    }
}


module.exports = new sectors_controller();


