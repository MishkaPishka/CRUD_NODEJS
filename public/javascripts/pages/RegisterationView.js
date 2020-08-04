class RegisterationView {
    constructor() {


        // $('#bbb').click(function(event){
        //     console.log('h')
        //     event.stopImmediatePropagation();
        //     event.preventDefault();
        //
        // })

        $(document).ready(function(){
            $("#main_sectors")[0].onclick = function () {  function_nav_to('sectors') }

            $("#main_stocks")[0].onclick = function () {  function_nav_to('stocks') }
            $("#main")[0].onclick = function () {  function_nav_to('') }


            $('#signButtonForm').click(function (e) {
                e.preventDefault();
                // Do something...
               // $('#myForm').submit();
            //    register_user_controller({'password':'d','email':'dd@f.com'})
                let input =   $('#myForm').serializeFormJSON();

               register_user_controller(input,'sign_in');

            });
            $('#registerButtonForm').click(function (e) {
                e.preventDefault();
                // Do something...
                // $('#myForm').submit();
                //    register_user_controller({'password':'d','email':'dd@f.com'})
                let input =   $('#registrationForm').serializeFormJSON();

                register_user_controller(input,'register');

            });
        });

    }


}