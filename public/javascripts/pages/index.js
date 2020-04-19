
$(document).ready( function(){

    [header_mapping,sectors_names,featured] = $aR ;


    $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
    $("#main_sectors")[0].onclick = function () {  function_nav_to('sectors') }
    $("#search_btn")[0].onclick = function() {  search_controller("#search_btn","#search_input") }

    $("#not_found")[0].style.visibility = 'hidden'

    $("#gotostoc")[0].onclick =  function () { clicked_stock_controller("#gotostoc")};

    $("#sort_by")[0].onchange =  function() {     sort_controller('/','sort_by');  }


    display_select_options('#sort_by', header_mapping);
    display_stock_data_table(featured, header_mapping);
    update_stock_table(stocks);
    display_sectors_list(sectors_names);


})//READY