var express = require('express');
var router = express.Router();

let sectors_controller = require('./sectors_controller');




let Sector = require('./Sector');



/* GET /sectors  */
router.get('/', function(req, res) {
    sectors_controller.get_names_of_sectors()
            .then(data => {
                console.log('sectors router - get_names_of_sectors :' + data);
                res.render('sectors_main', {sectors: data});
                })
            .catch(  err => res.send(err))
    })




router.get('/:name', function(req, res) {
        Promise.all([sectors_controller.get_sector(req.params.name),sectors_controller.get_sector_with_avarege_data( req.params.name)])
            .then(values => {
                console.log('router- get_sector_with_avarege_data :', values);
                 return res.render('sector', {sector: values[0],sector_data:values[1]  }  )   ;
            })
            .catch(err => {  return (res.status(500).send(err))}  );
});

router.get(':name/filter/:field', function(req, res) {
    console.log('        sectors_controller.get_stocks_sorted_by_field(req.params.name,req.params.field)',req.params.name,req.params.field);
        sectors_controller.get_stocks_sorted_by_field(req.params.name,req.params.field)
            .then (data => {
                res.send(data)
            })
            .catch(err => {  return (res.status(500).send(err))}  );
});

//Only description
router.post('/update',function (req,res) {
    console.log('    sectors_controller.update_sector( )',req.body.name,req.body.field,req.body.field_value)
    sectors_controller.update_sector( req.body.name,req.body.field,req.body.field_value)
        .then( data=>{
            delete(data['value']['_id']);
            res.send(data['value']);
        })
        .catch(err=>{    res.status(500).send(err);})

});//END name/update

//REMOVE SECTOR
router.post('/remove',function  (req,res) {
    console.log('sectors_controller.remove_sector()',req.body.name);
    sectors_controller.remove_sector( req.body.name)
        .then( data=>{
            res.send(data);
        })
        .catch(err=>{    res.status(500).send(err);})
});
//INSERT SECTOR
router.post('/insert',function  (req,res) {
    console.log('in insert:', req.body.name)
    sectors_controller.insert_sector( req.body.name)
        .then( data=>{
            console.log('insert',data);
            res.send(data);
        })
        .catch(err=>{    res.status(500).send(err);})
});
//REMOVE STOCK FROM SECTOR
router.post('/:name/remove',function (req,res) {
    console.log('    sectors_controller.remove_stock_from_sector( )',req.params.name,req.body.stock_name);
    sectors_controller.remove_stock_from_sector( req.params.name,req.body.stock_name)
        .then( data=>{
            console.log('router remove  ',data);
            res.send(data);
        })
        .catch(err=>{
            console.log('router remove error ',err);
            res.status(500).send(err);})

});//END name/update
//ADD STOCK TO SECTOR
router.post('/:name/insert',function (req,res) {
    console.log('    sectors_controller.add_stock_to_sector',req.params.name,req.body.stock_name);
    sectors_controller.add_stock_to_sector( req.params.name,req.body.stock_name)
        .then( data=>{
            console.log('router - insert stock to sector:',data);
            res.send(data);
        })
        .catch(err=>{    res.status(500).send(err);})

});//END name/insert
module.exports = router;

