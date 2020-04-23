


    function display_sector_stocks_table(list) {
        let list_parent = $('#stocks_list')[0];
        let title_text = '<h2>Stocks</h2>';

        let list_contant = title_text + '<ul>';
        for (var item in list) {
            list_contant += '<li style="padding-bottom: 10px;">';
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
        $("caption")[0].innerHTML = "<h2 > Stock:" + stock.name + "</h2>";

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



    function  update_stock_table(new_stocks) {
        $("tbody.stock_table_body").empty();
        for (i = 1; i <= new_stocks.length; i++) {
            let row = $(".stock_table_body")[0].insertRow(i - 1);
            row.className = 'rows_stocks';
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.className = 'thWidth';
            cell2.className = 'thWidth';
            cell3.className = 'thWidth';

            cell1.innerHTML = "<a  href ='/stocks/" + new_stocks[i - 1].name + "'>" + new_stocks[i - 1].name + "</a>";
            cell2.innerHTML = "<a href ='/stocks/" + new_stocks[i - 1].name + "'>" + new_stocks[i - 1].symbol + "</a>";
            cell3.innerHTML = "<a href ='/sectors/" + new_stocks[i - 1].sector + "'>" + new_stocks[i - 1].sector + "</a>";
        }
    }



    function display_select_options(select_id, options) {
        let select = $(select_id)
        Object.keys(options).forEach(key => {
            select.append(new Option(options[key], key))


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



    function  display_sectors_list(list) {
        let list_parent = $('#sectors_list')[0];

        let title_text = '<h2>SECTORS</h2>';
        let list_contant = '<ul>';
        for (var item in list) {
            list_contant += '<li style="padding-bottom: 10px;">';
            list_contant += '<span ><a href =\'/sectors/' + list[item] + '\' >' + list[item] + '</a></span>';
            list_contant += ' </li>';
        }
        list_contant += ' </ul>';

        list_parent.innerHTML = title_text+ list_contant;

    }



