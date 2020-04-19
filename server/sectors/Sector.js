class  Sector {

    constructor(sector_name){
        this.sector_name = sector_name;
        this.description = '';
        this.companys = [];
    }
    add_company(company){

    }
    remove_company(company){}

    set_description(dsc){
        this.description = dsc;
    }

}

module.exports = Sector;

