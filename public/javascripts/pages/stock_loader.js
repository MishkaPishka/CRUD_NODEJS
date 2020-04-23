
class StockView {

    constructor(stock,stock_fields,sector) {
        this.stock = stock;
        this.stock_fields = stock_fields;
        this.sector = sector;
        console.log('sector:ggg',this.sector);

    }

    init() {
        display_select_options('#stock_fields_select',  this.stock_fields);
// jQuery methods go here...
        $("#update_stock_btn")[0].onclick = function () {
            update_stock_conroller();
        };
        display_stock_data_table(this.stock, this.stock_fields );
        var sector = this.sector;

        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
        $("#main")[0].onclick = function () {  function_nav_to('') }
        $("#go_sector")[0].onclick = function () {
           function_nav_to('sectors/'+sector)

        }

    }
}
