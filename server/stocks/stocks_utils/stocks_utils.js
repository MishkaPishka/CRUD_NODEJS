
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

     parse_fields() {

     }

     header_to_mapping() {
         let header_mapping = {}
         header_mapping['52_week_high'] = '52 Week High';
         header_mapping['52_week_low'] = '52 Week Low';
         header_mapping['dividend_yield'] = 'Dividend Yield';
         header_mapping['ebitda'] = 'EBITDA';
         header_mapping['earning_to_share'] = 'Earnings/Share';
         header_mapping['market_cap'] = 'Market Cap';
         header_mapping['name'] = 'Name';
         header_mapping['price'] = 'Price';
         header_mapping['price_to_book'] = 'P/B';
         header_mapping['pe'] = 'P/E';
         header_mapping['price_to_sales'] = 'Price/Sales';
         header_mapping['sec_fillings'] = 'SEC Fillings';
         header_mapping['sector'] = 'Sector';
         header_mapping['symbol'] = 'Symbol';
         return header_mapping;
     }

}



module.exports = new stocks_utils();