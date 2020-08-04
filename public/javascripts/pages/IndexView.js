class IndexView {

    constructor(featured,sectors_names,header_mapping,stocks,logged) {

        this.featured = featured;
        this.sectors_names = sectors_names;
        this.header_mapping = header_mapping;
        this.stocks = stocks;
        this.logged = logged;
    }

    // [header_mapping,sectors_names,featured] = $aR ;

    init_main_page_view() {

        $("#search_btn")[0].onclick = function() {    search_controller("#search_btn","#search_input",'#stocks_table_main')  }

        $("#not_found")[0].style.visibility = 'hidden'

        $("#sort_by")[0].onchange =  function() {            sort_controller('/','sort_by','#stocks_table_main');  }



        display_select_options('#sort_by', this.header_mapping);
        display_stock_data_table(this.featured, this.header_mapping);
        update_stock_table(this.stocks,'','#stocks_table_main');//from stocks_main.EJS

        display_sectors_list(this.sectors_names);
        $("#gotostock")[0].onclick =  function () { clicked_stock_controller("#gotostock")};
        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
        $("#main_sectors")[0].onclick = function () {  function_nav_to('sectors') }
        $("#main_sectorsb")[0].onclick = function () {  function_nav_to('sectors') }

        $( "#includedContent" ).ready(function() {
            $("#includedContent").load("/htmls/navBar.html",function() {
                if (this.logged) {
                    $("#sign_in_nav a")[0].innerText = 'Sign Out';
                    $("#sign_in_nav a")[0].href = '/auth/sign_out';

                }
                else {
                    $("#sign_in_nav a")[0].innerText = 'Sign In';
                }
            })
        });



    }

}


