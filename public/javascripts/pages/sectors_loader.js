class SectorsView{
    constructor(sectors) {
        this.sectors = sectors;
    }
    init() {
        $("#insert_sector_btn")[0].onclick = function() { insert_sector_controller(); }
        $("#remove_sector_bth")[0].onclick = function() { remove_sector_controller(); }

        display_sectors_list(this.sectors);
        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
        $("#main")[0].onclick = function () {  function_nav_to('') }

    }
}