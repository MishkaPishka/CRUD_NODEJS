let stocksDAO = require("../stocksDAO");

class stockService {

    add_stock(stock) {
        return new Promise((resolve, reject) => {
            stocksDAO.add_stock(stock.name, stock.symbol, stock.sector)
                .then(_ => {
                    log.console('added stock - ' + stock);
                    return resolve();
                })
                .catch(err => reject(err))
        })


    }

    remove_stock(stock) {
        return new Promise((resolve, reject) => {
            stocksDAO.remove_stock(stock.name,stock.symbol,stock.sector)
                .then(_ => {
                    log.console('removed stock - ' + stock);
                    return resolve();
                })
                .catch(err => reject(err))
        })


    }

    get_stock_by_name(name) {
    return new Promise((resolve, reject) => {
        stocksDAO.get_stock_by_name(name)
            .then(data => {
                return resolve(data);
                console.log('get_stock_by_name: ' + data);

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



} //END CLASS

module.exports = new stockService();

