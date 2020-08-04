
function sort_controller(path,by,id) {
    let sort_criteria = sort_parser();
    function_sort(path,sort_criteria).then(res=>{
        update_stock_table(res,'',id);
    })
}

function  clicked_stock_controller(id) {
    let parsed_name = parse_name(id);
    if (parsed_name=='') console.log('invalid stock name');
    function_nav_to('stocks/'+parsed_name);

}
//search stock
function search_controller(search_button,search_value,t_id) {
    $("#not_found")[0].style.visibility = 'hidden';
    let search_type = 'name';
    let value =  parse_click_search_button();
    if (value =='')  {  return }

    search_request(search_type,value)
        .then(res =>{
            if ( res== undefined || res ==null || res == ''){
                display_modal_with_msg({responseText:"Stock not found",title:'Message'})

                //$("#not_found")[0].style.visibility = 'visible';
                return;
            }
                update_stock_table([res  ],'',t_id);
    })

}

function insert_remove_stock_controller(isInsert) {
    let parser = isInsert ? parse_insert_stock:parse_remove_stock;
    let stock;
    let title =  isInsert ? "Added":"Removed";

    let request = isInsert ? insert_stock_request:remove_stock_request;
    try {
        stock = parser();

    }
    catch(error)
    {

        display_modal_with_msg(error)

        return;
    }
    request(stock).then(data => {
        console.log('insert_stock_controller-',data);
        //     display_modal_with_msg()
        if (isInsert) {
            display_modal_with_link({responseTest:title+" stock:"+data.name+"",title:'Added Stock'},'/stocks/'+data.name)

        }
        else {
            display_modal_with_msg({responseText:"Removed stock:"+data.name+"",title:'Removed Stock'})

        }
        //  window.location.href='../stocks/'+data.name;

    }).catch(err=>{
        display_modal_with_msg(err)

        // console.log('insert_stock_controller error-',err.status,err.responseText);
    })



}
//update stock

function update_stock_dsc_conroller() {
    try {
        throw {responseText:'This feature is not supported yet'}
    }
    catch(error){
        display_modal_with_msg(error)

    }
}
function update_stock_conroller() {
    let update_data,stock_name,field_name,value;
    try {
        update_data = parse_update();
         stock_name = update_data[0];
         field_name = update_data[1];
         value = update_data[2];


    }
    catch(error) {
        display_modal_with_msg(error)
        return 
    }

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
                display_modal_with_msg({responseText:("Update Complete"),title:"Message"})

                display_stock_data_table(data.value,null)

            }
            else {
         //       display_error_msg('update invalid')
                throw {responseText:'update invalid'}
            }
            // function_nav_to('stocks/'+data.Name)

        }).catch(err=>{
        display_error_msg('update invalid:'+err);
            display_modal_with_msg(err)

        })


}

function insert_remove_sector_controller(isInsert) {
    let parser = isInsert? parse_add_sector : parse_remove_sector;
    let request_type = isInsert ? add_sector_request:remove_sector_request;
    let title = isInsert? "Added":"Removed"
    let sector = '';
    try {
        sector = parser();
    }
    catch(error) {
        display_modal_with_msg(error)
        return
    }
    request_type(sector)
        .then(data =>{
                display_modal_with_msg({responseText:(title+": "+data.sector_name),title:"Message"})

                return;
            }
        ).catch(err=>{

        display_modal_with_msg(err)

        // });
    })


}



//add stock to

function add_remove_stock_to_sector_controller(isAdd,sector_name) {
    let parse_id = isAdd ? "#add_stock_input":'#remove_stock_input';
    let request = isAdd? add_stock_to_sector_request:remove_stock_from_sector_request;
    let txt = isAdd ? "Added ":'Deleted ';
    try {
        let stock_to_add = get_sectors_change_stock_name(parse_id);
        if (stock_to_add=='') { throw new Error ("Required field: name")}
        request(sector_name,stock_to_add)
            .then(value => {
                if (value ==undefined) {
                    throw new Error('Error in removal')
                }
                display_modal_with_msg({responseText:txt+stock_to_add+" to sector: "+sector_name})

            }).catch(err => {     display_modal_with_msg(err)})
    }
    catch(err)
    {
        display_modal_with_msg(err)

    }



}




function change_description_controller(){
    try {
        let new_description = parse_change_sector_description();

        update_sector_description_request(sector_name,new_description)
            .then(value => {
                $("#sector_description")[0].innerText =  value['description'];
                clear_change_sector_description();
            }).catch(err => {   display_modal_with_msg(err)})
    }
    catch(err) {
        display_modal_with_msg(err)
    }


}
function follow_unfollow_stock_controller(stock_name,isFollow) {
    let title = isFollow ?"Following: ":"Unfollowing: "
    follow_stock_request(stock_name,isFollow)
        .then(_=>{
            display_modal_with_msg({responseText:(title+ stock_name),title:"Message"})

        })
        .catch(err=>{
            //    $(document).ready(function(){
            display_modal_with_msg(err)
            //   display_modal_with_msg(err);
            // $(".modal").modal('show');
            // });
        })
}
//unfollow stock


function update_personall_details_controller(details) {
    update_details_request(details)
        .then(_=>{
             console.log('details update')

            //display_modal_with_msg({responseText:"Details Updated ",title:'Message'})
         //   display_modal_with_link({responseTest:"Added stock:",title:'Added Stock'},'/stocks/')

        })
        .catch(err=>{
            console.log('details could not be update')

        })
}


function follow_unfollow_sector_controller(sector_name,isFollow) {
    let title = isFollow ?"Following: ":"Unfollowing: "
    follow_sector_request(sector_name,isFollow)
        .then(_=>{
            display_modal_with_msg({responseText:(title+ sector_name),title:"Message"})

        })
        .catch(err=>{
            //    $(document).ready(function(){
            display_modal_with_msg(err)
            //   display_modal_with_msg(err);
            // $(".modal").modal('show');
            // });
        })
}


//register user
function register_user_controller(parsed_data,type,modal) {

   registration_request(parsed_data,type,modal)
       .then(data => {

           console.log(data)

       })
       .catch(err=>{ console.log(err);})
}
