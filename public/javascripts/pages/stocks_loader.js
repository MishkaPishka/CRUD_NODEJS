
$(document).ready( function(){



    let stock_fields = document.cookie;
    stock_fields = JSON.parse(stock_fields);
    $("#sort_by")[0].onchange =  function() {     sort_controller('/stocks/','sort_by');  }
    $("#search_btn")[0].onclick = function() {  search_controller("#search_btn","#search_input") }
    $("#not_found")[0].style.visibility = 'hidden'
    $("#insert_stock_btn")[0].onclick = function() { insert_stock_controller() ; };
    $("#remove_stock_btn")[0].onclick = function() { remove_stock_controller() ;  };


    $("#not_found")[0].style.visibility = 'hidden';
    display_select_options('#sort_by', stock_fields);
    display_select_options('#insertSector', sectors);
    update_stock_table(stocks);//from stocks_main.EJS

    //I don't like it as it is bad practice to to use a variable which is defined in the ejs




})//READY


