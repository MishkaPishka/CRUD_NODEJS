var express = require('express');
var router = express.Router();

var path = require('path');
path.resolve(path.dirname(__filename),'..');
var p = path.parse(__dirname);



let stocksController = require('../../stocks/stocks_controller')
let sectorsController = require('../../sectors/sectors_controller')
let STOCKS_ARR_SIZE = 10; // ### SHOULD I PUT CONTANTS IN A DIFFERENT FILE ?


/* GET home page. */
router.get('/', function(req, res) {

    let header_mapping = stocksController.fields_to_header_mapping();
    Promise.all([sectorsController.get_names_of_sectors(), stocksController.get_top_i_by_name(10),stocksController.get_random_stock()])
        .then(values => {
                return res.render('index', {
                        title: 'Stocks and Stuff!',
                        stocks: values[1],
                        sectors_dictionary: values[0],
                        featured: values[2],
                        header_mapping:header_mapping
                    }
                );
            }
        ).catch(err => {  return (res.status(500).send(err))}  );

});


router.get('/search', function (req,res) {

    stocksController.search_stock_by_query(req.query)
            .then (data =>{
                console.log("search result for ",req.query," in server:",data);
                return (res.send(data));
            })
            .catch(err => {  return (res.status(500).send(err))}  );

})


router.get('/filter/:name', function(req, res) {
        stocksController.get_top_i_by_field(req.params.name,STOCKS_ARR_SIZE)
            .then (data => {
                return (res.send(data));
            })
            .catch(err => {  return (res.status(500).send(err))}  );


});


module.exports = router;

