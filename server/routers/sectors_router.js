var express = require('express');
var router = express.Router();

let sectorsService = require('../services/sector_service');



let Sector = require('../Sector');



/* GET /sectors  */
router.get('/', function(req, res) {

    return new Promise((resolve, reject) => {
        let sectors_list = null;
        let num_sectors = 0;
        sectorsService.get_sectors_by_name()
            .then(data => {
                sectors_list = data;
                console.log('after get sectors');
                console.log('sectors_list:' + sectors_list);
                resolve(res.render('sectors_main', {sectors: sectors_list}));

        }).catch(err => reject(err))
    })
})



/* GET /sectors/XXX. */
router.get('/:name', function(req, res, next) {
    return new Promise( (resolve, reject) => {
        let name = req.params.name;
        let sector = new Sector(name);
        let stocks_by_sector =null;
        sectorsService.get_stocks_by_sector(sector)
            .then(data => {
                return resolve(res.render('sector', {sector:name,stocks_by_sector: data,sectorData:{NumberOfScotks:0,PriceAVG:0,AVGMARKETCUP:0}}));

            }).catch(err => {return reject(res.status(500).send(err))});
    })
});



module.exports = router;

