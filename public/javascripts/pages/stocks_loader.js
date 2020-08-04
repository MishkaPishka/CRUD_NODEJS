class StocksView {
    constructor(stocks_fields,sectors,stocks) {
        this.stocks = stocks;
        this.stocks_fields = stocks_fields;
        this.sectors = sectors;

    }
    init () {
        $("#sort_by")[0].onchange =  function() {     sort_controller('/stocks/','sort_by','#table_all_stocks');  }
        $("#search_btn")[0].onclick = function() {  search_controller("#search_btn","#search_input",'#table_all_stocks') }
        $("#not_found")[0].style.visibility = 'hidden'
        $("#insert_stock_btn")[0].onclick = function() {  insert_remove_stock_controller(true);   };
        $("#remove_stock_btn")[0].onclick = function() { insert_remove_stock_controller(false);  };


        $("#not_found")[0].style.visibility = 'hidden';
        display_select_options('#sort_by', this.stocks_fields);
        display_select_options('#insertSector',this. sectors);
        update_stock_table(this.stocks,'scrollable1','#table_all_stocks');//from stocks_main.EJS

        //I don't like it as it is bad practice to to use a variable which is defined in the ejs
        $("#main_sectorsb")[0].onclick = function () {  function_nav_to('sectors') }
        $("#main")[0].onclick = function () {  function_nav_to('') }

        $("#includedContent").load("/htmls/navBar.html",function() {
            $('#stocks_nav')[0].className = 'active';
            if (logged) {
                $("#sign_in_nav a")[0].innerText = 'Sign Out';
                $("#sign_in_nav a")[0].href = '/auth/sign_out';

            } else {
                $("#sign_in_nav a")[0].innerText = 'Sign In';

            }

        })



    }
}


