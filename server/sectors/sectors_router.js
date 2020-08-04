var express = require('express');
var router = express.Router();

const generalUtils = require('../../config/general_utils')
const SectorsController = require('./sectors_controller');
const authUtils = require('../identify/identification_utils')







/* GET /sectors  */
router.get('/', function(req, res) {
    SectorsController.get_names_of_sectors()
            .then(data => {
                console.log('sectors router - get_names_of_sectors :' + data);
                res.render('sectors_main', {sectors: data,logged:authUtils.isSignedIn(req)});
                })
            .catch(  err => res.send(err))
    })



router.post('/:name/follow',authUtils.SignedInOrRedirect,function(req, res) {
    SectorsController.follow_sector( req.user.email,req.params.name)
        .then( data=>{
            if (data == null) {

                return  res.status(404).send("Must choose existing sector")
            }
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send(err);})
});

router.post('/:name/unfollow',authUtils.SignedInOrRedirect,function(req, res) {
    console.log('sectors_controller - unfollow sector:',req.params.name);
    SectorsController.unfollow_sector( req.user.email,req.params.name)
        .then( data=>{
            if (data == null) {

                return  res.status(404).send("Must choose existing sector")
            }
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send(err);})
});


//TODO -->
router.get('/:name', function(req, res,next) {
        Promise.all([SectorsController.get_sector(req.params.name),  SectorsController.get_stocks_by_sector(req.params.name) ,SectorsController.get_sector_with_avarege_data( req.params.name)])
            .then(values => {
                if(values[0]==null){

                 return next()
                    // let e= new Error('BROKEN');
                    // e= generalUtils.set_error(e,'404','BLA')
                    // throw (e)

                }
                console.log('router- get_sector_with_avarege_data :', values[1]);
                 return res.render('sector', {sector: values[0],stocks:values[1],sector_data:values[2],logged:authUtils.isSignedIn(req)  }  )   ;
            })
            .catch(err => {
               //(res.status(404).send(err))}
                next(err);}
                );
});

router.get(':name/filter/:field', function(req, res) {
    console.log('        sectors_controller.get_stocks_sorted_by_field(req.params.name,req.params.field)',req.params.name,req.params.field);
        SectorsController.get_stocks_sorted_by_field(req.params.name,req.params.field)
            .then (data => {
                res.send(data)
            })
            .catch(err => {  return (res.status(500).send(err))}  );
});

//Only description
router.post('/update',authUtils.SignedInOrRedirect,function (req, res) {
    console.log('    sectors_controller.update_sector description',req.body.name,req.body.field,req.body.field_value)
    SectorsController.update_sector( req.body.name,req.body.field,req.body.field_value)
        .then( data=>{

            delete(data['value']['_id']);
            res.send(data['value']);
        })
        .catch(err=>{    res.status(500).send(err);})

});//END name/update

//REMOVE SECTOR
//
router.post('/remove',authUtils.SignedInOrRedirect,function  (req, res) {
    console.log('sectors_controller.remove_sector()',req.body.name);
    SectorsController.remove_sector( req.body.name,req.user.email)
        .then( data=>{
            if (data == null) {

                return  res.status(404).send("Must choose existing sector with no stocks")
            }
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send(err);})

});
//insert sector
//,authUtils.SignedInOrRedirect,
router.post('/insert',authUtils.SignedInOrRedirect,function  (req, res) {

    SectorsController.insert_sector( req.body.name,req.user.email)
        .then( data=> {
            console.log('insert',data);
            res.send(data);
        })
        .catch(err=>{    res.status(500).send(err);})




});
//REMOVE STOCK FROM SECTOR
router.post('/:name/remove',authUtils.SignedInOrRedirect,function (req, res) {
    console.log('    sectors_controller.remove_stock_from_sector( )',req.params.name,req.body.stock_name);
    SectorsController.remove_stock_from_sector( req.params.name,req.body.stock_name)
        .then( data=>{
            console.log('router remove  ',data);
            res.send(data);
        })
        .catch(err=>{
            console.log('router remove error ',err);
            res.status(500).send(err);})

});//END name/update
//ADD STOCK TO SECTOR
router.post('/:name/insert',authUtils.SignedInOrRedirect,function (req, res) {
    console.log('    sectors_controller.add_stock_to_sector',req.params.name,req.body.stock_name);
    SectorsController.add_stock_to_sector( req.params.name,req.body.stock_name)
        .then( data=>{
            console.log('router - insert stock to sector:',data);
            res.send(data);
        })
        .catch(err=>{    res.status(500).send(err);})

});//END name/insert
module.exports = router;

