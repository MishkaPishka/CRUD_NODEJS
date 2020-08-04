
class stocks_utils {

    parse_update_request(stock_field, stock_value) {
        let header_mapping =this.header_to_mapping();
        if (header_mapping[stock_field] == undefined ) {
           return ['','','Invalid Stock Field']
        }
        else if (stock_field == 'sector') {
            return ['','','Cannot update sector from stock page'];
        }
        if ( ['name',  'sec_fillings' ,'symbol' ].includes(stock_field) ) {
            return [stock_field,stock_value,''];
        }
        else   return [stock_field,parseInt (stock_value),''];

    }
    cleanStock(stock) {
         if (stock !=null) {

            delete stock["_id"];
            delete stock["field"];
         }
        console.log('clean stock -',stock);
         return stock;


     }

     create_field_data(field,data) {
         let stock_data = {
             [field]: data
         }
         return stock_data;
     }

     parse_fields() {

     }




}



module.exports = new stocks_utils();