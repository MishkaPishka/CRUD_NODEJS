function parse_click_search_button(input='#search_input') {
    let search_input_element = $(input)
    if (search_input_element === undefined) return '';
    return search_input_element.val();

}
$(document).ready(function(){
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})

function sort_parser(id="#sort_by") {
    if ( $(id) === undefined) return ;
    return  $(id)[0].value;

}

function parse_name(id) {
    let tags = $(id);
    if (tags===undefined) return '';
    let name = tags[0].innerText;
    return name;
}

function parse_insert_stock() {
    let x = ['stock name','stock sector','stock symbol'];
    let stock_name = $("#insert_name")[0].value;
    let stock_symbol = $("#insert_symbol")[0].value;
    let stock_sector = $("#insertSector")[0].value;

    const a = {
        ...(stock_name=="" && {err: 'name'}),
        ...( stock_symbol == "" && {err: 'symbol'}),
        ...( stock_sector === "none" && {err: 'sector'})
    }

    if(  Object.getOwnPropertyNames(a).length != 0 )
    {
        throw {responseText:("Missing key parameter: "+ a.err)};
    }
    return  {name: stock_name, sector: stock_sector, symbol:stock_symbol};

}

function parse_remove_stock() {
    let stock_to_remove = $("#remove_stock_name")[0].value;
    if (stock_to_remove=="") {
        throw {responseText:("Missing key parameter: name")};

    }
    return {name:stock_to_remove}
}

function parse_update() {


    let stock_name = $(document).attr('title');
    let value = $("#update_stock_value")[0].value
    let field_name = $("#stock_fields_select")[0].value
    console.log('init_update_stock',stock_name,field_name,value);

    if (stock_name =='' || field_name=='' || value=='')    {
        throw {responseText:("Missing key parameter")};

    }

    return [stock_name,field_name,value];
}

function parse_change_sector_description() {
    let sector_dsc= $("#sector_description_input")[0].value
    if (sector_dsc=='') {

        throw {responseText:("Missing key parameter: description")};

    }
    return sector_dsc;
}

function clear_change_sector_description() {
     $("#sector_description_input")[0].value = '';
}

function parse_remove_sector() {
    let sector_name = $("#remove_sector_input")[0].value ;
    if (sector_name=='') {

        throw {responseText:("Missing key parameter: name")};

    }
    return sector_name

}
function  parse_add_sector() {
    let sector_name =  $("#insert_sector_input")[0].value ;
    if (sector_name=='') {

        throw {responseText:("Missing key parameter: name")};

    }
    return sector_name

}

function parse_stock_to_add_sector() {
    let stock_name =  $("#add_stock_input")[0].value ;
    if (stock_name=='') {

        throw {responseText:("Missing key parameter: name")};

    }
    return stock_name



}
function get_sectors_change_stock_name(id) {
    console.log()
    let stock_name =  $(id)[0].value ;
    if (stock_name=='') {
        throw {responseText:("Missing key parameter: name")};

    }
    return stock_name





}

function parse_register_user(){
    return '';
}