let sectorsDAObject = require("../sectorsDAO");

class SectorsService {

    get_sectors_by_name() {
        return new Promise((resolve, reject) => {
            sectorsDAObject.get_sectors_by_name()
                .then(data=> {
                    console.log(data);
                    console.log("------");
                    return resolve(data);
                })
                .catch(err => reject(err))



        })
}

    get_stocks_by_sector(sector) {
        let sector_name = sector.sector_name;
        return new Promise((resolve, reject) => {
            sectorsDAObject.get_stocks_by_sector(sector.sector_name)
                .then(data=> {
                    return resolve(data);
                })
                .catch(err => reject(err))
        })

    }
}


module.exports = new SectorsService();




