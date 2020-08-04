
function search_request(field,value) {
    return new Promise((resolve, reject) => {
        let query = {}

        query[field] = value;
        console.log('aaa', query);
        $.get('/search/', query)

            // .done(function (data, statusText, xhr) {
            //     var status = xhr.status;                //200
            //     var head = xhr.getAllResponseHeaders(); //Detail header info
            //     console.log("search stock - done:", data);
            //     console.log("search stock - 1111:", status);
            //     console.log("search stock - 222:", xhr);
            //
            //     return resolve(data);
            // })
            .done((data, statusText, xhr)=> {
                var status = xhr.status;                //200
                var head = xhr.getAllResponseHeaders(); //Detail header info
                console.log("search stock - done:", data);
                console.log("search stock - 1111:", status);
                console.log("search stock - 222:", xhr);

                return resolve(data);
            })
            .fail(err => {
                console.log("search error -:", err);
                return reject(err);
            })


    })
}


function function_sort(path,name) {
    // console.log(name);
    return new Promise( (resolve,reject) => {
        $.get(path + 'filter/' + name)
            .done(data => {
                return resolve(data)
            }).fail(err => {
            return reject(err)
        })
    })


}


 function update_stock_request(stock_name,field,field_value) {
    return new Promise ( (resolve, reject) => {
        let stock_json_description = {name: stock_name,field:field,field_value:field_value};
        console.log("update_stock_request -",stock_json_description);

        $.post('/stocks/update',stock_json_description)
            .done(data=>{
                console.log("update stock - done:",data);
                return resolve(data)
        }).fail(err => {
        console.log("update_stock_request error -:",err);
            return reject(err)
            })

    // return resolve(data);
    // $("#stock_delete_errr")[0].innerHTML = "<span >"+err.msg+"</span>";

})




}

function function_nav_to(adress) {
    window.location.href='../'+adress;
}


// $(document).ready(function(){


function insert_stock_request(stock) {
    return new Promise ( (resolve, reject) => {
        $.post('/stocks/insert',stock)

            .done(data=>
            {
                    return resolve(data);

            })
            .fail(err =>
                {
                    return reject(err);


                }
            );//fail
    })

}

function update_sector_description_request(sector_name,new_description) {
    console.log('update_sector_description_request',new_description);
    return new Promise ( (resolve, reject) => {

        let stock_json_description = {name: sector_name,field:'description',field_value:new_description};

        $.post('/sectors/update',stock_json_description)
            .done(data =>{
                console.log('updated description:',data);
                resolve(data);
            }).fail(err=>
        {
            console.log('oooo',err);
            reject(err);
        }
        )

    })

}

function remove_stock_request(stock_name){
    return new Promise ( (resolve, reject) => {
        console.log("remove_stock_request -",stock_name.name);
        $.post('/stocks/delete',stock_name)
            .done(data=>{
                console.log("remove_stock_request - done:",data);

                // display_delete_message(data);
                return resolve(data);
                // $("#stock_delete_errr")[0].innerHTML = "deleted"+ data.msg.value;
            }).fail(err => {
            console.log("remove_stock error -:",err);

             return reject(err);
            // $("#stock_delete_errr")[0].innerHTML = "<span >"+err.msg+"</span>";

        })
    })


}

function remove_sector_request(sector_name) {
    return new Promise ( (resolve, reject) => {
        console.log("remove_sector_request -",sector_name);
        let stock_json_description = {name: sector_name};
        $.post('/sectors/remove',stock_json_description)
            .done(data=>{
                console.log("remove_sector_request - done:",data);
                if (data == null) {
                    return reject("Error");
                }
                // display_delete_message(data);
                return resolve(data);
            }).fail(err => {

            return reject(err);

        })
    })

}

function add_sector_request(sector_name) {
    return new Promise ( (resolve, reject) => {
        console.log("add_sector_request -",sector_name);
        let stock_json_description = {name: sector_name};
        $.post('/sectors/insert',stock_json_description)
            .done(data=>{
                console.log("add_sector_request - done:",data);

                // display_delete_message(data);
                return resolve(data);
            }).fail(err => {
            console.log("add_sector_request error -:",err.responseText);

            return reject(err);

        })
    })

}

function add_stock_to_sector_request(sector_name,stock_to_add) {
    return new Promise ( (resolve, reject) => {
        console.log("add_sector_request -",sector_name);
        let stock_json_description = {stock_name: stock_to_add};
        $.post('/sectors/'+sector_name+'/insert',stock_json_description)
            .done(data=>{
                console.log("add_sector_request - done:",data);

                // display_delete_message(data);
                return resolve(data);
            }).fail(err => {
            console.log("add_sector_request error -:",err);
            return reject(err);

        })
    })
}
function remove_stock_from_sector_request(sector_name,stock_to_remove){
    return new Promise ( (resolve, reject) => {
        console.log("remove_sector_request -",sector_name);
        let stock_json_description = {stock_name: stock_to_remove};

        $.post('/sectors/'+sector_name+'/remove',stock_json_description)
            .done(data=>{
                console.log("remove_sector_request - done:",data);

                // display_delete_message(data);
                return resolve(data);
            }).fail(err => {
            console.log("remove_sector_request error -:",err);

            return reject(err);

        })
    })
}

function follow_stock_request(stocke_name,follow){
    return new Promise ( (resolve, reject) => {
        let follow_req= follow? 'follow': 'unfollow';
        $.post('/stocks/'+stocke_name+'/'+follow_req)
            .done(data=>{
                console.log("follow stock request -",data);
                return resolve(data);
            }).fail(err => {
            console.log("follow stock request error-",err);
            return reject(err);

        })
    })
}

function follow_sector_request(sector,follow){
    return new Promise ( (resolve, reject) => {
        let follow_req= follow? 'follow': 'unfollow';

        $.post('/sectors/'+sector+'/'+follow_req)
            .done(data=>{
                console.log("follow sector request -",data);
                return resolve(data);
            }).fail(err => {
            console.log("follow sector request error-",err);
            return reject(err);

        })
    })
}

function   update_details_request(details) {
    return new Promise ( (resolve, reject) => {

        $.post('/users/update',details)
            .done(data=>{
                console.log("update user details  request -",data);
                return resolve(data);
            }).fail(err => {
            console.log("update user details request error-",err);
            return reject(err);

        })
    })

}
function registration_request(request,type,isModal) {
    return new Promise ( (resolve, reject) => {

        $.post('/auth/'+type,request)
            .done(data=>{
                if( data.signedStatus ){
                    if (isModal) {
                      //  $('#sign_in_modal').modal('toggle');
                        $("#sign_in_modal_top").modal('toggle');
                    }
                    else {
                        window.location.reload();
                    }

                }
                // display_delete_message(data);
                return resolve(data);
            }).fail(err => {

            return reject(err);

        })
    })
}




