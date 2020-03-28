var express = require('express');
var router = express.Router();
var path = require('path');


let stocksDAO = require('../stocksDAO');



let stock = require('../Stock');
let sector = require('../Sector');



// STOCKS MAIN PAGE
router.get('/', function(req, res) {
    console.log("get - stocks_main");


    return new Promise((resolve, reject) => {

        let stocks = null;
        stocksDAO.get_list_all()
            .then(data => {
                console.log("after list all companies");
                console.log(data);
                stocks = data;
                resolve(   res.render('stocks_main', { stocks: stocks}));
            })
    }).catch(err => reject(err))

});

// //got a search query
// router.post('/', function(req, res, next) {
//     let name = req.body.name;
//     redirect_to_stock_page(name)
//
// });



//insert stock
router.post('/insert', function(req, res) {
    console.log("post - in insert");


    return new Promise((resolve, reject) => {
        let symbol = req.body.symbol;
        let name = req.body.name;
        let sector = req.body.sector;
        console.log("insert: " + symbol, name, sector);
        let stock = new Stock(name, symbol, sector);
        //INSERT TO DAB
        console.log("search for: " + req.body.name);
        stocksDAO.add_stock(stock)
            .then(data => {
                console.log('add stock:'+ data);
                if (stock == null) reject('no such stock');
                else resolve(res.redirect('/stocks/' + stock.name));
            })
    }).catch(err => console.log(err));
});

/* GET users listing. */
router.get('/:name', function(req, res) {
    let name = req.params.name;
    console.log('get name;'+name);

    return new Promise( (resolve, reject) => {
        let stock = null;
        stocksDAO.get_stock_by_name(name)

            .then(data => {
                stock = data;
                resolve( res.render('stock', {stock: stock}));

            })
    }).catch(err => console.log(err));
});


module.exports = router;
