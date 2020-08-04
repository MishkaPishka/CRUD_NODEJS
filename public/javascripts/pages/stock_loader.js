
class StockView {

    constructor(stock,stock_fields,sector,logged) {
        this.stock = stock;
        this.stock_fields = stock_fields;
        this.sector = sector;
        this.logged =logged;

    }



    init() {
        display_select_options('#stock_fields_select',  this.stock_fields);
// jQuery methods go here...
        $("#update_stock_btn")[0].onclick = function () {
            update_stock_conroller();
        };
        $("#update_stock_dsc")[0].onclick = function () {
            update_stock_dsc_conroller();
        };


        display_stock_data_table(this.stock, this.stock_fields );
        var sector = this.sector;

        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
        $("#main")[0].onclick = function () {  function_nav_to('') }
        $("#go_sector")[0].onclick = function () {
           function_nav_to('sectors/'+sector)

        }

        $('#followStock').click( () => {
            follow_unfollow_stock_controller(this.stock['name'],true)

        });

        $('#unfollowStock').click( () => {
            follow_unfollow_stock_controller(this.stock['name'],false)
        });




        $("#includedContent").load("/htmls/navBar.html",()=> {
            $('#stocks_nav')[0].className = 'active';
            if (this.logged) {
                $("#sign_in_nav a")[0].innerText = 'Sign Out';
                $("#sign_in_nav a")[0].href = '/auth/sign_out';

            }
            else {
                $("#sign_in_nav a")[0].innerText = 'Sign In';

            }
        })
    }
}
