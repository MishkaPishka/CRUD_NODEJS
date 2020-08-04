var path = require('path');
path.resolve(path.dirname(__filename),'..');

const authUtils = require('../identify/identification_utils')
const constants = require('../../config/constants')

const express = require('express');
const router = express.Router();
const stocksController = require('../stocks/stocks_controller')
const sectorsController = require('../sectors/sectors_controller')


/* GET home page. */
router.get('/', function(req, res) {

    let header_mapping =constants.header_mapping;
    Promise.all([sectorsController.get_names_of_sectors(), stocksController.get_top_i_by_name(constants.stocks_size_arr),stocksController.get_random_stock()])
        .then(values => {
                return res.render('index', {
                        title: 'Stocks and Stuff!',
                        stocks: values[1],
                        sectors_dictionary: values[0],
                        featured: values[2],
                        header_mapping:header_mapping,
                        logged:authUtils.isSignedIn(req),
                    }
                );
            }
        ).catch(err => {  return (res.status(500).send(err))}  );

});


router.get('/search', function (req,res) {

    stocksController.search_stock_by_query(req.query)
            .then (data =>{
                console.log("search result for ",req.query," in server:",data);
                return (res.status(200).send(data));
            })
            .catch(err => {  return (res.status(500).send(err))}  );

})


router.get('/filter/:name', function(req, res) {
        stocksController.get_top_i_by_field(req.params.name,constants.stocks_size_arr)
            .then (data => {
                return (res.send(data));
            })
            .catch(err => {  return (res.status(500).send(err))}  );


});


module.exports = router;

