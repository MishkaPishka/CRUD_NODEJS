class SectorsView{
    constructor(sectors,logged) {
        this.sectors = sectors;
        this.logged = logged;
    }
    init() {
        $("#insert_sector_btn")[0].onclick = function() { insert_remove_sector_controller(true);  }
        $("#remove_sector_bth")[0].onclick = function() { insert_remove_sector_controller(false); }

        display_sectors_list(this.sectors);
        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
        $("#main")[0].onclick = function () {  function_nav_to('') }
      //  $("#main")[0].onclick = function () {  function_nav_to('') }

        $( "#includedContent" ).ready(function() {
            $("#includedContent").load("/htmls/navBar.html",function() {
                $('#sectors_nav')[0].className = 'active';

            if (logged) {
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