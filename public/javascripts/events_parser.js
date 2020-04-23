function parse_click_search_button(input='#search_input') {
    let search_input_element = $(input)
    if (search_input_element === undefined) return '';
    console.log('kkk',search_input_element.val())
    return search_input_element.val();

}

function sort_parser(id="#sort_by") {
    if ( $(id) === undefined) return ;
    return  $(id)[0].value;

}

function parse_name(id) {
    let tags = $(id);
    if (tags===undefined) return '';
    let name = tags[0].innerText;
    let stockName =name.split('the day: ')[1];
    return stockName;
}

function parse_insert_stock() {
    let stock_name = $("#insert_name")[0].value;
    let stock_symbol = $("#insert_symbol")[0].value;
    let stock_sector = $("#insertSector")[0].value;
    if(stock_name == null || stock_name.length==0 || stock_symbol == null || stock_symbol.length==0  )
    {
        throw {msg:"missing name or something"};
    }
    return  {name: stock_name, sector: stock_sector, symbol:stock_symbol};

}

function parse_remove_stock() {
    let stock_to_remove = $("#remove_stock_name")[0].value;
    return stock_to_remove
}

function parse_update() {
    let stock_name = $(document).attr('title');
    let value = $("#update_stock_value")[0].value
    let field_name = $("#stock_fields_select").val()
    console.log('init_update_stock',stock_name,field_name,value);
    return [stock_name,field_name,value];
}

function parse_change_sector_description() {
    return $("#sector_description_input")[0].value
}

function clear_change_sector_description() {
     $("#sector_description_input")[0].value = '';
}

function parse_remove_sector() {
    return $("#remove_sector_input")[0].value ;

}
function  parse_add_sector() {
    return $("#insert_sector_input")[0].value ;

}

function parse_stock_to_add_sector() {
    return $("#add_stock_input")[0].value ;

}
function parse_stock_to_remove_sector() {
    return $("#remove_stock_input")[0].value ;

}
