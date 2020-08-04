

let usersService = require('./users_service')
let stocksService = require('../stocks/stocks_service')
let sectorsService = require('../sectors/sector_service')
let User = require('./users');
let genUtils = require('../../config/general_utils')
class UserController {

     async get_user_info(user_id) {
         let user_info = await usersService.get_user_info_by_id(user_id)

        let stocks_following =  user_info['stocks_following'];
         let following_stocks_data =   await stocksService.get_stocks_data(stocks_following);
         user_info['stocks_following'] = following_stocks_data

         let stocks_added =  user_info['stocks_added'];
         let added_stocks_data =   await stocksService.get_stocks_data(stocks_added);
         user_info['stocks_added'] = added_stocks_data
         // for (let  i in  user_info['sectors_following']) {
         //     console.log('hhhh',i)
         //     user_info['sectors_following'][i]
         // }
         user_info['sectors_following'] =genUtils.remove_from_arr(user_info['sectors_following'],null)
         user_info['sectors_added'] =genUtils.remove_from_arr(user_info['sectors_added'],null)



          return user_info;

    }


    find_user_by_mail(email) {
        return new Promise ( (resolve, reject) => {
            usersService.find_user_by_mail(email)
                .then(data => {
                    resolve(data)
                })
                .catch(err=>{reject(err)})
        })

    }
}

module.exports = new UserController();

