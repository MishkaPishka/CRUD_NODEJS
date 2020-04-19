


let sectorsService = require('../sectors/sector_service');
let stocksService = require('../stocks/stocks_service');

class StocksController {
    update_stock(stock_name, stock_field, stock_value) {
        return new Promise((resolve, reject) => {
            if (stock_field == 'sector') {
                let err = 'cannot change sector from stock page';
                return reject(err);
            } else if (stock_field =='undefined'||stock_field =='none') {
                let err = 'cannot change undefined field';
                return reject(err);
            }
            else{
                return resolve(stocksService.update_stock(stock_name, stock_field, stock_value));
            }

        })
    };
    get_stocks_by_sector(sector) {}
    get_top_i_by_field(name) {
        return stocksService.get_top_i_by_field(name)

    }

    get_stock_by_name(name) {
        return         stocksService.get_stock_by_name(name)

    }
    add_stock(stock_to_insert) {
        return Promise.all([ stocksService.add_stock(stock_to_insert),sectorsService.add_stock_to_sector(stock_to_insert.sector,stock_to_insert.name)])





    }
    remove_stock(stock_name) {
        return Promise.all([ stocksService.remove_stock(stock_name),sectorsService.remove_stock_from_sector_by_stock_name(stock_name)])



    }
    search_stock_by_query(query) {}
    get_list_all() {
        return stocksService.get_list_all();
    }

    get_names_sectors() {
        return sectorsService.get_names_sectors();
    }
}


module.exports = new StocksController();

