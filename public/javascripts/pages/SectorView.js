

class SectorView {
    constructor(sector_name , description ,stocks ,avg_data, y,logged) {
        this.sector_name = sector_name;
        this.description = description;
        this.stocks = stocks;
        this.avg_data = avg_data;
        this.y = y;
        this.logged = logged;
    }

    init() {

        $("#sector_title")[0].innerText = this.sector_name;
        $("#sector_title")[0].style = 'text-align:center';
        $("#sector_description")[0].innerText = this. description;

        display_stock_data_table(this.avg_data,this.y );
        display_sector_stocks_table(this.stocks);

        $("caption")[0].innerHTML="<h2 '>"+this.sector_name+" - Avarged Info</h2>";
        $("#main_sectors")[0].onclick = function () {  function_nav_to('sectors') }
        $("#main")[0].onclick = function () {  function_nav_to('') }
        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }

        $("#add_sector_description")[0].onclick = function () {  change_description_controller();}



        $("#remove_stock_btn").click( () => {  add_remove_stock_to_sector_controller(false,this.sector_name ) } )
        $("#add_stock_btn").click( () => {  add_remove_stock_to_sector_controller(true,this.sector_name )} )


        $('#followSector').click( () => {
            follow_unfollow_sector_controller(this.sector_name,true)
        });

        $('#unfollowSector').click( () => {
            follow_unfollow_sector_controller(this.sector_name,false)

        });


        $("#includedContent").load("/htmls/navBar.html",()=> {
            $('#sectors_nav')[0].className = 'active';
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