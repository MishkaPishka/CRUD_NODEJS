

let sectorsDAObject = require("./sectorsDAO");
let stockService = require('../stocks/stocks_service');

class SectorsService {

    get_names_sectors() {
        return new Promise((resolve, reject) => {
            sectorsDAObject.get_names_sectors()
                .then(data=> {
                    console.log('service - get_names_sectors.',data);
                    return resolve(data);
                })
                .catch(err => {return reject(err)})
        })
}
    get_sector_by_name(name) {
        return new Promise((resolve, reject) => {
            sectorsDAObject.get_sector({"sector_name":name})
                .then(data=> {
                    console.log('service - get_sector_by_name.',data);

                    return resolve(data);
                })
                .catch(err => {return reject(err)})
        })
    }


    get_stocks_by_sector(sector) {
        let sector_name = sector.sector_name;
        return new Promise((resolve, reject) => {
            sectorsDAObject.get_stocks_by_sector(sector.sector_name)
                .then(data=> {
                    console.log('service - get_stocks_by_sector.',data);
                    return resolve(data);
                })
                .catch(err => {return reject(err)})
        })

    }

    remove_stock_from_sector(sector,stock) {
        return sectorsDAObject.remove_stock_from_sector(sector,stock)
    }
    remove_stock_from_sector_by_stock_name(stock) {
        return sectorsDAObject.remove_stock_from_sector_by_stock_name(stock);
    }

    add_stock_to_sector(sector,stock) {
        return sectorsDAObject.add_stock_to_sector(sector,stock)

    }

    update_sector(sector_name,field,value) {
        let update = {}
        update[field]=value
        return sectorsDAObject.update_sector(sector_name,update);

    }

     remove_sector(sector_name) {
         let query = {}
         query['sector_name'] = sector_name;
         query['companys'] = [];
         return sectorsDAObject.remove_sector(query);

    }
    insert_sector(sector_name) {
        return sectorsDAObject.insert_sector(sector_name);
    }
}


module.exports = new SectorsService();




