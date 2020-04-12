var express = require('express');
var router = express.Router();

var path = require('path');
path.resolve(path.dirname(__filename),'..');
var p = path.parse(__dirname);

let pp = path.resolve(__dirname, '../../data/DB');
//TODO -- PUT IN PROMISE - TRY CATCH

let stocksService = require('../services/stocks_service');
let sectorsService = require('../services/sector_service');

let Stock = require('../Stock');
let sector = require('../Sector');



/* GET home page. */
router.get('/', function(req, res) {

    var sectors_dictionary = null;
    var stocks = null;
    return Promise.all([sectorsService.get_sectors_by_name(), stocksService.get_top_i_by_name(10),stocksService.get_random_stock()])
        .then(values => {
                sectors_dictionary = values[0];
                stocks = values[1];
                console.log(sectors_dictionary);
                console.log(stocks);
                return res.render('index', {
                        title: 'Stocks and Stuff!',
                        stocks: stocks,
                        sectors_dictionary: sectors_dictionary,
                        featured: values[2][0]
                    }
                );
            }
        ).catch(err => console.log(err))
});


router.get('/search/:name', function (req,res) {
    console.log("AA");
    return new Promise( (resolve, reject) =>  {

        let name = req.params.name;



        stocksService.get_stock_by_name(name)
            .then (data =>{
                console.log("search result in server:",data);
                resolve(res.send(data));

                // resolve(res.redirect("/www"));


            })
            .catch (err =>{reject(err)} );

    });

})



router.get('/filter/:name', function(req, res) {
    return new Promise( (resolve, reject) =>  {

        let name = req.params.name;
        let size_stocks_arr = 10;
        stocksService.get_top_i_by_field(size_stocks_arr,name)
            .then (data => {
                console.log(data);
                resolve(res.send(data));

            })
            .catch (err =>{reject(err)} );

    });

});



// /* GET users listing. */
// router.post('/:name', function(req, res, next) {
//   console.log(req.params.name);
//   console.log('33');
//
//   let stock = db.get_stock_by_name(name);
//   res.redirect('/'+req.params.name);
//   res.render('stocks', { stock: stock});
//
// });


//   //get list of all stocks
//   var sectors_dictionary =db.get_count_by_sectors();
//   var list_of_stocks = null;
//   return new Promise( (resolve, reject) => {
//     list_of_stocks = db.get_list_all();
//   }).then (data=>{
//     res.render('index', { title: 'Stocks and Stuff!' ,stocks:list_of_stocks,sectors_dictionary:sectors_dictionary,featured:null});
//     return resolve;
//
//   })
//       .catch(err=>console.log(err))
//
// });




//search value
router.post('/', function(req, res) {
  // console.log('search value');
  // //get list of all stocks
  // let name = req.body.name;
  // console.log("search for: "+req.body.name);
  // var sectors_dictionary = null;
  // var list_of_stocks = null;
  // var stock = null;
  // return new Promise( (resolve, reject) => {
  //   stock = db.get_stock_by_name(name);
  //   if (stock == null) reject('no such stock');
  //   else resolve(stock);
  // }).then(data => {
  //   console.log(data);
  //   sectors_dictionary = db.get_count_by_sectors();
  //   console.log(sectors_dictionary);
  // })
  //     .then(data=>{
  //
  //   list_of_stocks = db.get_list_all();
  //   console.log(list_of_stocks);
  //
  //     }).then(data=>{
  //     res.render('index', { title: 'Stocks and Stuff!' ,stocks:list_of_stocks,sectors_dictionary:sectors_dictionary,featured:stock});
  //   }).catch(err => console.log(err));
  //
  //


  });


  // redirect_to_stock_page(name)
  // var sectors_dictionary =db.get_count_by_sectors();
  // var list_of_stocks = db.get_list_all();
  // res.render('index', { title: 'Stocks and Stuff!' ,stocks:list_of_stocks,sectors_dictionary:sectors_dictionary});



//


//
// router.get('/hello/:name/:lastName', (req, res) => {
//   console.log(req.params)
//   let name = req.params.name
//   let lastName = req.params.lastName
//   res.send('Hello ' + name + ' ' + lastName +'!')
// })
//

module.exports = router;

