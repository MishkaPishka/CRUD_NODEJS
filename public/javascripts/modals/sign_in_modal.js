$( "#sign_in_modal" ).ready(function() {
    $("#sign_in_modal").load("../htmls/sign_in.html",()=> {
        $('#signButtonForm').click(function (e) {
            e.preventDefault();
            // Do something...
            // $('#myForm').submit();
            //    register_user_controller({'password':'d','email':'dd@f.com'})
            let input =   $('#myForm').serializeFormJSON();

            register_user_controller(input,'sign_in',true);

        });
    })
})


$( "#error_modal" ).ready(function() {
    $("#error_modal").load("../htmls/modals.html",()=> {
    })
})



