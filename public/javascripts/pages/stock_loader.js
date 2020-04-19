
$(document).ready( function(){



    let stock_fields = document.cookie;
    stock_fields = JSON.parse(stock_fields);

    display_select_options('#stock_fields_select', stock_fields);
// jQuery methods go here...
    $("#update_stock_btn")[0].onclick = function () {
        update_stock_conroller();
    };
    display_stock_data_table(st,y );


    $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
    $("#main")[0].onclick = function () {  function_nav_to('') }
    $("#go_sector")[0].onclick = function () {  function_nav_to('sectors/'+sector) }

})//READY
