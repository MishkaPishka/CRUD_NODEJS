var express = require('express');
var router = express.Router();
var path = require('path');


// let stocksDAO = require('../stocksDAO');
let stocksService = require('../services/stocks_service');



let Stock = require('../Stock');
let sector = require('../Sector');



// STOCKS MAIN PAGE
router.get('/', function(req, res) {
    console.log("get - stocks_main");


    return new Promise((resolve, reject) => {
        let stocks = null;
        stocksService.get_list_all()
            .then(data => {
                console.log(data);
                stocks = data;
                //HERE
                let sectors = []
                stocks.forEach(entry => {

                    if (false==sectors.includes(entry['Sector'])) { sectors.push(entry['Sector'])}

                })
                resolve(   res.render('stocks_main', { stocks: stocks.slice(0,10),sectors:sectors}));
            }).catch(err => reject(err))
    })

});

// //got a search query
// router.post('/', function(req, res, next) {
//     let name = req.body.name;
//     redirect_to_stock_page(name)
//
// });


router.post('/insert/',function (req,res) {
    return new Promise ( (resolve, reject) => {
        console.log('insert - in router -',req.body.Name,req.body.Symbol,req.body.Sector);
        let stock_to_insert  = new Stock(req.body.Name,req.body.Symbol,req.body.Sector);
        stocksService.add_stock(stock_to_insert)
            .then( data=>{
                console.log("valid resolve for pose:",data);
                    return resolve(res.send(data))
                }
            ).catch(err=>{   console.log("error: in insert ",err); return reject(res.status(500).send(err));})
    })
});;//END post /insert


router.post('/update',function (req,res) {
    return new Promise ( (resolve, reject) => {
        let stock_name = req.body.name;
        let stock_field= req.body.field;
        let field_value= req.body.field_value;
        let stock_data = {}
        stock_data['field'] = stock_field

        stock_data[stock_field] = field_value
        console.log('update stock:',stock_name,stock_data);
        stocksService.update_stock(stock_name,stock_data)
            .then( data=>{
                // console.log('aaa',data.stock,"ccc")
                return resolve(res.send(data.stock));
                 // resolve( res.render('stock', {stock:data.stock}));


                    // return resolve(res.render(data.stock))
                }
            ).catch(err=>{   console.log("error in  ",err); return reject(res.status(500).send(err));})
    })
});;//END name/update

router.post('/delete', function(req, res) {

    return new Promise((resolve, reject) => {
        let name = req.body.name;
        console.log("router delete: ", name);
        stocksService.remove_stock(name).then(data => {
            console.log("post delete result:",data);
                return resolve(res.send(data));
            }
        ).catch(err => {
            console.log('router post delete error:',err);
            return reject(res.status(500).send(err))
        });

    });
});//END post /delete

router.post('/update', function(req, res) {

    return new Promise((resolve, reject) => {
        let name = req.body.name;
        let field = req.body.field;
        let value = req.body.value;
        let update_data = {}
        let data_field =field;
        update_data[data_field] =value;
        console.log("router update: ", name,' ',update_data);
        stocksService.update_stock(name,update_data).then(data => {
                console.log("updated result:",data);
                return resolve(res.send(data));
            }
        ).catch(err => {
            return reject(res.status(500).send(err))
        });

    });
});//END post /delete

/* STOCKS PAGE . */
router.get('/:name', function(req, res) {
    let name = req.params.name;
    return new Promise( (resolve, reject) => {
        let stock = null;
        stocksService.get_stock_by_name(name)
            .then(data => {
                if (data ==null) {
                    throw {err:'no such stock'};
                }
                stock = data;
                delete stock["_id"];
                resolve( res.render('stock', {stock: stock}));

            }).catch(err =>{ console.log(err); return reject(res.send(err));});
    })
});


router.get('/search/:name', function (req,res) {
    return new Promise( (resolve, reject) =>  {

        let name = req.params.name;


        console.log("search result in server:",name);

        stocksService.get_stock_by_name(name)
            .then (data =>{
                console.log("search result in server:",data);
                resolve(res.send(data));

                // resolve(res.redirect("/www"));


            })
            .catch (err =>{reject(err)} );

    });

});
module.exports = router;
