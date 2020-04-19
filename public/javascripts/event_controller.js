
function sort_controller(path,id) {
    let sort_criteria = sort_parser();
    function_sort(path,sort_criteria).then(res=>{
        update_stock_table(res);
    })
}

function  clicked_stock_controller(id) {
    let parsed_name = parse_name(id);
    if (parsed_name=='') console.log('invalid stock name');
    function_nav_to('stocks/'+parsed_name);

}

function search_controller(search_button,search_value) {
    $("#not_found")[0].style.visibility = 'hidden';
    let search_type = 'name';
    let value =  parse_click_search_button();
    if (value =='')  {  console.log('cannot send request:',value);return;}

    search_request(search_type,value)
        .then(res =>{
            if ( res== undefined || res ==null || res == ''){
                $("#not_found")[0].style.visibility = 'visible';
                return;
            }
                update_stock_table([res  ]);
    })

}

function insert_stock_controller() {
    let stock = '';
    try {
        stock = parse_insert_stock();

    }
    catch(error)
    {
        display_error_msg( error.msg)

        return;
        }
    insert_stock_request(stock).then(data => {
        console.log('insert_stock_controller-',data);
         window.location.href='../stocks/'+data.name;

    }).catch(err=>{
        display_error_msg("Insertion Error")
        console.log('insert_stock_controller error-',err);
    })
}

function  remove_stock_controller() {
    $("#stock_delete_errr")[0].innerHTML = "";
    let stock_name = parse_remove_stock();
    if (stock_name=='') {
        console.log('error - invalid input');
        return;
    }
    remove_stock_request(stock_name).then (data=>{
        if (data.err == 'True' ){
            console.log(data,"FAIL");
            display_error_msg( "Error: invalid stock name");
        }
        else {
            display_time_out_msg("#delete_msg_status", "Deleted:"+data.msg.name)
        }
    }).catch(err => {
        display_error_msg( "Error: invalid stock name");



    })


}

function update_stock_conroller() {
    let update_data = parse_update();
    if (update_data[0] =='' || update_data[1]=='' || update_data[2]=='')    { return ;}
    let stock_name = update_data[0];
    let field_name = update_data[1];
    let value = update_data[2];
    console.log('update_stock_conroller:',stock_name,field_name,value);
        update_stock_request(stock_name,field_name,value)
        .then(data=>{
            console.log('in update_stock_conroller -',data);
            if (data.value != null)
            {
                if (data.value.name==value){
                    function_nav_to('stocks/'+value);
                    return;
                }
                display_stock_data_table(data.value,null)

            }
            else {
                display_error_msg('update invalid')

            }
            // function_nav_to('stocks/'+data.Name)

        }).catch(err=>{
        display_error_msg('update invalid:'+err);

        })


}

function  insert_sector_controller() {
    let sector_to_add = parse_add_sector();
    add_sector_request(sector_to_add)
        .then(data =>{
                console.log('sector_to_add:',data);
                display_time_out_msg('#msg',"Added: "+sector_to_add)

            }
        ).catch(err=>{
            console.log('sector_to_remsector_to_addror:',err);
        display_error_msg( 'Addition error:');

        })
}

function  remove_sector_controller() {
    console.log('remove_sector_controller');

    let sector_to_remove = parse_remove_sector();
      remove_sector_request(sector_to_remove)
          .then(data =>{
                  display_time_out_msg('#msg',"Removed:"+data['value']['sector_name'])

              }
          ).catch(err=>{
          display_error_msg( 'Removal error: Sector contains stock or doesn\'t exist');

      })

}

function add_stock_to_sector_controller(){
    let stock_to_add= parse_stock_to_add_sector();
    add_stock_to_sector_request(sector_name,stock_to_add)
        .then(value => {
            display_time_out_msg('#msg',"Insert:"+value)

        }).catch(err =>
        {
            display_error_msg( "Insert Error");

        }
    )


}


function remove_stock_from_sector_controller(){
    let stock_to_remove = parse_stock_to_remove_sector();
    console.log('event controller - remove stock from sector -',sector_name,"stock name:",stock_to_remove);
    remove_stock_from_sector_request(sector_name,stock_to_remove)
        .then(value => {
            if (value ==undefined) {
                display_error_msg('Error in removal')
                return;
            }

            display_time_out_msg("#msg","Deleted:"+stock_to_remove);
        }).catch(err =>
        {
            console.log('error in remove',err);
            // $("#msg")[0].innerText =  err;
            display_error_msg('Error in removal')

        }
    )


}

function change_description_controller(){
    let new_description = parse_change_sector_description();

    update_sector_description_request(sector_name,new_description)
        .then(value => {
             $("#sector_description")[0].innerText =  value['description'];
            clear_change_sector_description();
        }).catch(err =>
            {
                console.log('error in update',err);
            $("#sector_description")[0].innerText =  err;

             }
            )

}

