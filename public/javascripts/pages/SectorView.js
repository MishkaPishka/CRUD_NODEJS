

class SectorView {
    constructor(sector_name , description ,stocks ,avg_data, y) {
        this.sector_name = sector_name;
        this.description = description;
        this.stocks = stocks;
        this.avg_data = avg_data;
        this.y = y;

    }

    init() {
        // stock_fields = document.cookie;
        // stock_fields = JSON.parse(stock_fields);



        // display_select_options('#sort_by', stock_fields);

        $("#sector_title")[0].innerText = 'Sector: ' + this.sector_name ;
        $("#sector_description")[0].innerText = this. description;
        display_stock_data_table(this.avg_data,this.y );
        display_sector_stocks_table(this.stocks);

        $("caption")[0].innerHTML="<h2  style='width:450px;'>"+this.sector_name+" -Avarged Info</h2>";
        $("#main_sectors")[0].onclick = function () {  function_nav_to('sectors') }
        $("#main")[0].onclick = function () {  function_nav_to('') }

        $("#add_sector_description")[0].onclick = function () {  change_description_controller();}

        $("#remove_stock_btn")[0].onclick = function () { remove_stock_from_sector_controller();}
        $("#add_stock_btn")[0].onclick = function () { add_stock_to_sector_controller();}


    }

}