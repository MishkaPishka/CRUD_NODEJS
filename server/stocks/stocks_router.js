
var express = require('express');
var router = express.Router();
var path = require('path');



let stocks_controller = require('./stocks_controller');

let Stock = require('./Stock');
let sector = require('../sectors/Sector');

const default_stock_list_length = 10;




router.post('/insert/',function (req,res) {
        console.log('insert - in router -',req.body.name,req.body.symbol,req.body.sector);
        let stock_to_insert  = new Stock(req.body.name,req.body.symbol,req.body.sector);
        stocks_controller.add_stock(stock_to_insert)
            .then( data=>{

                console.log("valid resolve for pose:",data);
                    return res.send(data[0])
                }
            ).catch(err=>{   console.log("error: in insert ",err); return (res.status(500).send(err));})

});


router.post('/update',function (req,res) {
        let stock_name = req.body.name;
        let stock_field= req.body.field;
        let field_value= req.body.field_value;
    stocks_controller.update_stock(stock_name,stock_field,field_value)

            .then( data=>{
                 res.send(data);
             })
            .catch(err=>{    res.status(500).send(err);})

});//END name/update

router.post('/delete', function(req, res) {
        let name = req.body.name;
        console.log("router delete: ", name);
        stocks_controller.remove_stock(name)
            .then(data => {
            console.log("post delete result:",data);
                return (res.send(data));
            }
        ).catch(err => {
            console.log('router post delete error:',err);
            return (res.status(500).send(err))
        });


});//END post /delete



/* STOCKS PAGE . */
router.get('/:name', function(req, res) {
    let name = req.params.name;
    return new Promise( (resolve, reject) => {
        stocks_controller.get_stock_by_name(name)
            .then(data => {
                if (data ==null) {
                    throw {err:'no such stock'};
                }

                resolve( res.render('stock', {stock: data}));

            }).catch(err =>{ console.log(err); return reject(res.send(err));});
    })
});
router.get('/filter/:name', function(req, res) {
    return new Promise( (resolve, reject) =>  {
        let name = req.params.name;
        stocks_controller.get_top_i_by_field(name)
            .then (data => {
                resolve(res.send(data));

            })
            .catch (err =>{reject(err)} );
    });

});

// STOCKS MAIN PAGE
router.get('/', function(req, res) {
    Promise.all([stocks_controller.get_names_sectors(), stocks_controller.get_list_all()])
        .then(values => {
            let sectors = values[0];
            let stocks = values[1];
            console.log(stocks);
            res.render('stocks_main', { stocks: stocks,sectors:sectors});

        } ).catch(err => console.log(err))

});
router.get('/search/:name', function (req,res) {

        let name = req.params.name;


        console.log("search result in server:",name);
    stocks_controller.get_stock_by_name(name)

            .then (data =>{
                console.log("search result in server:",data);
                resolve(res.send(data));

                // resolve(res.redirect("/www"));


            })
            .catch (err =>{reject(err)} );


});

module.exports = router;
