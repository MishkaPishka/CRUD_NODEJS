class MyStocksView {
    constructor(info,logged) {
        this.info = info;
        this.logged = logged;

    }


    init() {
        $('#first_name')[0].setAttribute('value',this.info['first_name']);
        $('#last_name')[0].setAttribute('value',this.info['last_name']);
        $('#email')[0].setAttribute('value',this.info['email']);

        update_stock_table(this.info['stocks_following'],'scrollable1','#table_stocks_following');//from stocks_main.EJS
        update_stock_table(this.info['stocks_added'],'scrollable1','#table_stocks_added');//from stocks_main.EJS
        display_sectors_list(this.info['sectors_added'],'#sectors_added',true);
        display_sectors_list(this.info['sectors_following'],'#sectors_following',true);

        $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
        $("#main")[0].onclick = function () {  function_nav_to('') }
        $("#main_sectors1")[0].onclick = function () {   function_nav_to('sectors') }


        $('#submit_details').click(function (e) {
            e.preventDefault();
            // Do something...
            // $('#myForm').submit();
            //    register_user_controller({'password':'d','email':'dd@f.com'})
            let input =   $('#detailsForm').serializeFormJSON();
           // register_user_controller(input,'sign_in');
            update_personall_details_controller(input)
        });
        $( "#includedContent" ).ready(function() {


            $("#includedContent").load("/htmls/navBar.html",function() {
                $('#my_stocks_nav')[0].className = 'active';

                if (this.logged) {
                    $("#sign_in_nav a")[0].innerText = 'Sign Out';
                    $("#sign_in_nav a")[0].href = '/auth/sign_out';


                }
                else {
                    $("#sign_in_nav a")[0].innerText = 'Sign In';

                }
            })

            // $( "#user_info" ).ready(function() {
            //     $('#user_info')[0].innerText = first_name + ', ' + last_name + ', '+ email;
            // })
        });

        // window.sessionStorage.setItem("paka", "qewfqwafd");
        // console.log('aaa',window.sessionStorage['paka'])
        // window.sessionStorage.setItem("paka",'');
        // console.log('aaa',window.sessionStorage['paka'])

    }

}



