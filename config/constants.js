

let STOCKS_ARR_SIZE = 10; // ### SHOULD I PUT CONTANTS IN A DIFFERENT FILE ?


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



module.exports.stocks_size_arr = STOCKS_ARR_SIZE;
module.exports.header_mapping = header_mapping;
