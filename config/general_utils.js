//iterate over array and remove
const remove_from_arr = function (arr,remove_all) {
        return arr.filter(function(a){return a !== remove_all;});
}

const set_error = function (error,status,txt) {

        error.status = status;
        error.message =txt;

}
exports.remove_from_arr = remove_from_arr
exports.set_error = set_error