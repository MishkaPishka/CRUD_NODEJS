

let sectorsService = require('../sectors/sector_service');
let stocksService = require('../stocks/stocks_service');
const stock_utils = require('./stocks_utils/stocks_utils')

class StocksController {
    search_stock_by_query(query) {
        return stocksService.search_stock_by_query(query);
    }
    update_stock(stock_name, stock_field, stock_value) {
            let [_stock_field,_stock_value,err_msg] = stock_utils.parse_update_request(stock_field,stock_value);
            if (err_msg != '') {
                console.log('parse error')
                return (err_msg);
            }
            return stocksService.update_stock(stock_name, _stock_field, _stock_value)





    };

    get_random_stock() {
        return stocksService.get_random_stock();
    }
    get_stocks_by_sector(sector) {}
    get_top_i_by_field(name,count) {
        return stocksService.get_top_i_by_field(name,count)

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
    get_list_all() {
        return stocksService.get_list_all();
    }

    get_names_sectors() {
        return sectorsService.get_names_sectors();
    }

    fields_to_header_mapping() {
        return stock_utils.header_to_mapping();
    }
    get_top_i_by_name(i) {
        return stocksService.get_top_i_by_name(i);
    }
}


module.exports = new StocksController();

