
class stocks_utils {


    cleanStock(stock) {
         if (stock !=null) {

             console.log(stock,"AAA");
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


}



module.exports = new stocks_utils();