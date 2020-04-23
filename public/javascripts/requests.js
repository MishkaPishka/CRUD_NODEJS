
function search_request(field,value){
    return new Promise ((resolve,reject) => {
        let query = {}

        query[field] =value;
        console.log('aaa',query);
        $.get('/search/',query)
            .done(data=>{
                console.log("search stock - done:",data);
                console.log(data)
                return resolve(data)
            }).fail(err => {
            console.log("search error -:",err);
            return reject(data);
        })

    })

}



function function_sort(path,name) {
    // console.log(name);
    return new Promise( (resolve,reject) => {
        $.get(path + 'filter/' + name)
            .done(data => {
                console.log("update stock - done:", data);
                console.log(data)
                return resolve(data)
            }).fail(err => {
            console.log("remove_stock error -:", err);
            return reject(data)
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
            return reject(err.responseText)
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
                    console.log('returned false');
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
    console.log('update_sector_description_request(sector_name,new_description)',new_description);
    return new Promise ( (resolve, reject) => {

        let stock_json_description = {name: sector_name,field:'description',field_value:new_description};

        $.post('/sectors/update',stock_json_description)
            .done(data =>{
                console.log('updated description:',data);
                resolve(data);
            }).fail(err=>
        {console.log(err);})

    })

}

function remove_stock_request(stock_name){
    return new Promise ( (resolve, reject) => {
        console.log("remove_stock_request -",stock_name);
        let stock_json_description = {name: stock_name};
        $.post('/stocks/delete',stock_json_description)
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
                if (data['value'] == null) {
                    return reject("Error");
                }
                // display_delete_message(data);
                return resolve(data);
            }).fail(err => {
            console.log("remove_sector_request error -:",err);

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
            console.log("add_sector_request error -:",err);

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




