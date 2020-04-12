//General functions for requests
function clicked_search_button(){
        $("#not_found")[0].style.visibility = 'hidden';

        var search_value = $("#search_input").val();
        if (search_value==='') {
            console.log('Empty search field');
            return ;
        }
        var client = new HttpClient();
        let r = null;

        client.get('/search/'+search_value, function(response) {
            r = response;
            if (r=="")   { $("#not_found")[0].style.visibility = 'visible'; return;}



            let new_stocks =JSON.parse(r);
            update_stock_table([new_stocks  ]);



        });




}



function function_sort(name){
    // console.log(name);
    var client = new HttpClient();
    let r = null;
    client.get('/filter/'+name, function(response) {
        r = response;
        let new_stocks =JSON.parse(response);
        update_stock_table(new_stocks);

    });
    // console.log("abc:"+r);

}
function update_stock_table(new_stocks) {
    $("tbody.stock_table_body").empty();
    for (i = 1; i <= new_stocks.length; i++) {
        let row = $(".stock_table_body")[0].insertRow(i - 1);
        row.className = 'rows_stocks';
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = "<a  href ='/stocks/" + new_stocks[i - 1].Name + "'>" + new_stocks[i - 1].Name + "</a>";
        cell2.innerHTML = "<a href ='/stocks/" + new_stocks[i - 1].Name + "'>" + new_stocks[i - 1].Symbol + "</a>";
        cell3.innerHTML = "<a href ='/sectors/" + new_stocks[i - 1].Sector + "'>" + new_stocks[i - 1].Sector + "</a>";
    }
}

function update_stock_request(stock_name,field,field_value,callbackFunction=console.log) {



    let stock_json_description = {name: stock_name,field:field,field_value:field_value};
    console.log("update_stock_request -",stock_json_description);

    $.post('/stocks/update',stock_json_description)
        .done(data=>{
            console.log("update stock - done:",data);

            // document.querySelector('html').innerHTML = data;

            function_nav_to('stocks/'+field_value)
            // display_delete_message(data);
            // return resolve(data);
            // $("#stock_delete_errr")[0].innerHTML = "deleted"+ data.msg.value;
        }).fail(err => {
        console.log("remove_stock error -:",err);
        callbackFunction(err);

        // return resolve(data);
        // $("#stock_delete_errr")[0].innerHTML = "<span >"+err.msg+"</span>";

    })
}

function function_nav_to(adress) {
    window.location.href='../'+adress;
}


// $(document).ready(function(){

    var HttpClient = function() {
    this.get = function(aUrl, aCallback) {

        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

            anHttpRequest.open( "GET", aUrl, true );
            anHttpRequest.send( null);



    };

}

function remove_stock_request(stock_name,callbackFunction){

    console.log("remove_stock_request -",stock_name);
    let stock_json_description = {name: stock_name};
    $.post('/stocks/delete',stock_json_description)
        .done(data=>{
            console.log("remove_stock_request - done:",data);
            callbackFunction(data);

            // display_delete_message(data);
            // return resolve(data);
            // $("#stock_delete_errr")[0].innerHTML = "deleted"+ data.msg.value;
        }).fail(err => {
            console.log("remove_stock error -:",err);
        callbackFunction(err);

        // return resolve(data);
        // $("#stock_delete_errr")[0].innerHTML = "<span >"+err.msg+"</span>";

    })

}
//     console.log("IN JS script");
//     let yy = 12;
// });
// let x = 9;
// console.log("x");
//
// let f = function() { console.log("f");}
//
//
// let check_valid_input = function (value) {
//     console.log(value);
// }



// export {x}
//
// <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
// //COPIED FROM - https://stackoverflow.com/questions/247483/http-get-request-in-javascript
// var HttpClient = function() {
//     this.get = function(aUrl, aCallback) {
//         var anHttpRequest = new XMLHttpRequest();
//         anHttpRequest.onreadystatechange = function() {
//             if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
//                 aCallback(anHttpRequest.responseText);
//         }
//
//         anHttpRequest.open( "GET", aUrl, true );
//         anHttpRequest.send( null);
//     };
//
// }
//
// var HELPER = function() {
//
//     this.navTo = function (addr) {
//         window.location.href = '../' + addr;
//
//     };
//     this.clicked_search = function(){
//         var search_value = document.getElementById("search_input").value;
//         var client = new HttpClient();
//         client.get('/search/'+search_value, function(response) {
//
//             if (response!="") {
//                 //Q&A 1 : response status?
//                 // let new_stocks =JSON.parse(response);
//                 // console.log("Z:",new_stocks);
//                 return response;
//             }
//             return {};
//
//
//         });
//
//     }
//
// }
//
// export let x = 6;
// // export { HttpClient, HELPER ,x };