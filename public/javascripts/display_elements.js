


    function display_sector_stocks_table(list) {
        let list_parent = $('#stocks_list')[0];
        list_parent.style='height:300px;';
        let title_text = '<h2 style="text-align: center">Stocks</h2>';

        // let list_contant = title_text + '<ul class="list-group"> ';
        let list_contant = title_text + '<ul class="list-group"'+ 'style="overflow-y: scroll;height:75%;"> ';

        for (var item in list) {
            list_contant += '<li class="list-group-item" style="padding-bottom: 10px;">';
            list_contant += '<span ><a href =\'/stocks/' + list[item] + '\' >' + list[item] + '</a></span>';
            list_contant += ' </li>';
        }
        list_contant += ' </ul>';

        list_parent.innerHTML = list_contant;

    }



    function display_stock_data_table(stock, header_mapping) {
        if (header_mapping == null) {
            header_mapping = document.cookie;
            header_mapping = JSON.parse(header_mapping);
        }

        $("table.table_heads_stocks").empty();
        $("table.table_heads_stocks")[0].createCaption();
        $("caption")[0].innerHTML ='<h2>'+ stock.name ;
        +'</h2>' ;


        $("caption")[0].style= 'caption-side: top;text-align:center';
        $("caption")[0].id='gotostock';

        $("table.table_heads_stocks")[0].className='table_heads_stocks table table-bordered';

        var header = $(".table_heads_stocks")[0].createTHead();

        var row = header.insertRow(0);
        var cell = row.insertCell(0);
        var cell2 = row.insertCell(1);
        row.innerHTML = "<tr ><th class ='table_heads_stocks'>Property</th><th class ='table_heads_stocks'>Value</th></tr>"
        row.className = 'table_heads_stocks';


        let i = 0;
        Object.keys(stock).forEach(key => {
            let row = $(".table_heads_stocks")[0].insertRow(i + 1);
            row.className = 'table_heads_stocks';
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.className = 'table_heads_stocks';
            cell2.className = 'table_heads_stocks';

            cell1.innerHTML = header_mapping[key];
            cell2.innerHTML = stock[key];
        })


        return;

    }



    function  update_stock_table(new_stocks,scrollable1, id) {
        $(id).empty();
       // id +
        let i = 0;
        for (i = 1; i <= new_stocks.length; i++) {
            let row = $(id)[0].insertRow(i - 1);
             row.className = 'rows_stocks '+scrollable1;
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.className = 'thWidth ';
            cell2.className = 'thWidth ';
            cell3.className = 'thWidth ';
            cell1.innerHTML = "<a  href ='/stocks/" + new_stocks[i - 1].name + "'>" + new_stocks[i - 1].name + "</a>";
            cell2.innerHTML = "<a href ='/stocks/" + new_stocks[i - 1].name + "'>" + new_stocks[i - 1].symbol + "</a>";
            cell3.innerHTML = "<a href ='/sectors/" + new_stocks[i - 1].sector + "'>" + new_stocks[i - 1].sector + "</a>";
        }
    }



    function display_select_options(select_id, options) {
        let select = $(select_id);
        Object.keys(options).forEach(key => {
            let option = new Option(options[key], key)
            select.append(option);


        })
    }



    function  display_error_msg(msg) {
        display_time_out_msg('#error', msg)


    }



    function display_time_out_msg(id, msg) {
        $(id)[0].innerHTML = msg;

        setTimeout(function () {
            $(id)[0].innerText = '';

        }, 1500);
    }



    function  display_sectors_list(list,id,ignore) {
    if(id==undefined) {
        id='#sectors_list'
    }
        let list_parent = $(id)[0];

        let title_text = '';
        // let list_contant = '<ul class="nav nav-pills flex-column">';
        let i = ignore? '':'Sectors</h3></LH>';

        let list_contant = '<ul class="list-group"><LH style=""><h3 id="main_sectors" style="text-align:center">'+i;



        for (var item in list) {
            list_contant += '<li class="list-group-item" style="padding-bottom: 10px;">';
            list_contant += '<span ><a href =\'/sectors/' + list[item] + '\' >' + list[item] + '</a></span>';
            list_contant += ' </li>';
        }
        list_contant += ' </ul>';

        list_parent.innerHTML = title_text+ list_contant;

    }
    function set_signout() {
        $("#sign_in_nav li a ")[0].innerText = "Sign out"
        $("#sign_in_nav li a ")[0].href = "/"

    }
    function  set_sign_in() {
        $("#sign_in_nav li a ")[0].innerText = "Sign in"
        $("#sign_in_nav li a ")[0].href = "/users_info_page/sign_in"

    }



    function display_modal_with_msg(err) {
        if (err.status==401) {
            $("#sign_in_modal_top").modal('show');
        }
        else {
            let title_text = err.title==undefined ? 'Error' : err.title;
            $("#error_modal_top .modal-header").text(title_text);
            $("#error_modal_top .modal-body").text(err.responseText);
            $("#error_modal_top").modal('show');

        }
    }



    function display_modal_with_link(msg,link) {


            if(msg.title!=undefined) {
                $("#error_modal_top .modal-header").text(msg.title);
            }

            $("#error_modal_top .modal-body ").html('<a href='+link+' >Click here to view stock');
            $("#error_modal_top").modal('show');


    }