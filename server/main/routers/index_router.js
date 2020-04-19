var express = require('express');
var router = express.Router();

var path = require('path');
path.resolve(path.dirname(__filename),'..');
var p = path.parse(__dirname);

let pp = path.resolve(__dirname, '../../data/DB');
//TODO -- PUT IN PROMISE - TRY CATCH

let stocksService = require('../../stocks/stocks_service');
let sectorsService = require('../../sectors/sector_service');

let Stock = require('../../stocks/Stock');
let sector = require('../../sectors/Sector');



/* GET home page. */
router.get('/', function(req, res) {

    var sectors_dictionary = null;
    var stocks = null;
    let header_mapping = stocksService.header_to_titles_mapping();

    return Promise.all([sectorsService.get_names_sectors(), stocksService.get_top_i_by_name(10),stocksService.get_random_stock()])
        .then(values => {
                sectors_dictionary = values[0];
                stocks = values[1];

                return res.render('index', {
                        title: 'Stocks and Stuff!',
                        stocks: stocks,
                        sectors_dictionary: sectors_dictionary,
                        featured: values[2],
                        header_mapping:header_mapping
                    }
                );
            }
        ).catch(err => console.log(err))
});


router.get('/search', function (req,res) {
    return new Promise( (resolve, reject) =>  {

        stocksService.search_stock_by_query(req.query)
        // stocksService.get_stock_by_name(name)
            .then (data =>{
                console.log("search result for ",req.query," in server:",data);
                resolve(res.send(data));
            })
            .catch (err =>{reject(err)} );

    });

})



router.get('/filter/:name', function(req, res) {
    return new Promise( (resolve, reject) =>  {
        let name = req.params.name;
        let size_stocks_arr = 10; // ### SHOULD I PUT CONTANTS IN A DIFFERENT FILE ?
        stocksService.get_top_i_by_field(name,size_stocks_arr)
            .then (data => {
                resolve(res.send(data));

            })
            .catch (err =>{reject(err)} );
    });

});



module.exports = router;

