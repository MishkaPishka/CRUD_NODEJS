
var express = require('express');
var router = express.Router();
var path = require('path');



let stocks_controller = require('./stocks_controller');
const authUtils = require('../identify/identification_utils')
const generalUtils = require('../../config/general_utils')

let Stock = require('./Stock');

//insert stock
router.post('/insert/',authUtils.SignedInOrRedirect,function (req, res) {
        console.log('insert - in router -',req.body.name,req.body.symbol,req.body.sector);
        let stock_to_insert  = new Stock(req.body.name,req.body.symbol,req.body.sector);
        stocks_controller.add_stock(stock_to_insert,req.user.email)
            .then( data=>{
                console.log("valid resolve for pose:",data);
                    return res.send(data)
                }
            ).catch(err=>{   console.log("error: in insert ",err); return (res.status(500).send(err));})
});


router.post('/update',authUtils.SignedInOrRedirect,function (req, res) {
    stocks_controller.update_stock( req.body.name,req.body.field, req.body.field_value)
            .then( data=>{
                 res.send(data);
             })
            .catch(err=>{    res.status(500).send(err);})

});//END name/update

//remove stock
router.post('/delete',authUtils.SignedInOrRedirect, function(req, res) {

        console.log("router delete: ", req.body.name);
        stocks_controller.remove_stock(req.body.name)
            .then(data => {
            console.log("post delete result:",data[0]);
                console.log("post delete result:",data[1]);
                if (data[0] == null) {  return  res.status(404).send("Data missing in Data Base")}

                (res.send(data[0]));

            }).catch(err => {
            console.log('router post delete error:',err);
             (res.status(500).send(err))
        });


});//END post /delete



/* STOCKS PAGE . */
router.get('/:name', function(req, res,next) {
        stocks_controller.get_stock_by_name( req.params.name)
            .then(data => {
                if (data ==null) {

                   return next();
                }
                return ( res.render('stock', {stock: data,logged:authUtils.isSignedIn(req)}));

            }).catch(err =>{ console.log(err); return (res.send(err));});


});
router.get('/filter/:name', function(req, res) {
        let name = req.params.name;
        stocks_controller.get_top_i_by_field(name)
            .then (data => {
                (res.send(data));

            })
            .catch (err => {res.status(500).send(err) } );


});

// STOCKS MAIN PAGE
router.get('/', function(req, res) {
    Promise.all([stocks_controller.get_names_sectors(), stocks_controller.get_list_all()])
        .then(values => {
            let sectors = values[0];
            let stocks = values[1];
            console.log(stocks);
            res.render('stocks_main', { stocks: stocks,sectors:sectors,logged:authUtils.isSignedIn(req)});

        } ).catch (err => {res.status(500).send(err) } );

});
router.get('/search/:name', function (req,res) {

    console.log("search result in server:",req.params.name);
    stocks_controller.get_stock_by_name( req.params.name)
            .then (data =>{
                console.log("search result in server:",data);
                res.send(data);
            })
        .catch (err => {res.status(500).send(err) } );


});
//follow

router.post('/:name/follow',authUtils.SignedInOrRedirect,function(req, res) {
    console.log('router - follow stock:',req.params.name,' , ',req.user.email);
    stocks_controller.set_user_follow_stock(req.params.name,true,req.user.email)
        .then(data =>{
            console.log('router - follow stock - result:',data)
            return res.send(data);
        })
        .catch(err => {
            console.log('router - follow stock - error',err);
            res.status(500).send(err)})
});
//unfollow
router.post('/:name/unfollow',authUtils.SignedInOrRedirect,function(req, res) {
    console.log('router - unfollow stock:',req.params.name,' , ',req.user.email);
    stocks_controller.set_user_follow_stock(req.params.name,false,req.user.email)
        .then(data =>{
            console.log('router - un follow stock - result:',data)
            return res.send(data);
        })
        .catch(err => {res.status(500).send(err)})
});
module.exports = router;
