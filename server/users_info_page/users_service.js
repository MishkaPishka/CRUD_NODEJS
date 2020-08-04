

let User = require('./users');
var ObjectId = require('mongodb').ObjectID;

class UsersService {

    find_user_by_mail(email) {
        return null;
    }
    async get_user_info_by_id(user_id) {
        // let x=  User.findById(  "ObjectId(\"" + user_id + "\")");
        // let x=  User.findById( new ObjectId(user_id));
        const doc1 = await User.findById(user_id).select("-hash -salt -__v").exec()
        return doc1;

        //     return   User.findById(user_id).select("-hash -salt -__v").exec()
        // return new Promise ( (resolve, reject) => {
        //     User.findById(user_id).select("-hash -salt -__v").exec()
        //         .then(data=>{
        //             console.log('1111111111',data)
        //             resolve( data);
        //
        //         })
        //         .catch(err=>{reject( err);})
        // })


    }


    //TODO
    remove_stock_by_name_from_users(stock_name) {
        return new Promise ( (resolve, reject) => {
            throw Error({msg:'remove_stock_by_name_from_users is not done'})
            return resolve( undefined);

        })

    }


    async user_remove_follow_stock(u_mail,stock_name) {
        return await   User.update(
            {email: u_mail},
            {$pull: {stocks_following: { $in: [ stock_name ] } }},{multi:true}
        ).exec()
    }

    async user_add_follow_stock(u_mail,stock_name) {
        return    User.update(
            {email: u_mail},
            {$addToSet: {stocks_following: stock_name} }
        ).exec()
    }
    async user_remove_stock(u_mail,stock_name) {
        return await   User.update(
            {email: u_mail},
            {$pull: {stocks_added: { $in: [ stock_name ] } }},{multi:true}
        ).exec()
    }

    async user_add_stock(u_mail, stock_name) {

        return await User.update(
            {email: u_mail},
            {$addToSet: {stocks_added: stock_name} }
        ).exec();
    }

    change_status_follow_stock(umail, follow, stock_name) {
        if (follow){
            return this.user_add_follow_stock(umail,stock_name)
        }
        else {
            return this.user_remove_follow_stock(umail,stock_name)
        }
    }

     change_status_follow_sector(umail, follow, sector_name) {
        if (follow){
            return this.user_add_follow_sector(umail,sector_name)
        }
        else {
            return this.user_remove_follow_sector(umail,sector_name)
        }
    }

    async user_remove_follow_sector(u_mail,sector_name) {
        return await   User.update(
            {email: u_mail},
            {$pull: {sectors_following: { $in: [ sector_name ] } }},{multi:true}
        )
    }

    async user_add_follow_sector(u_mail,sector_name) {
        return await   User.update(
            {email: u_mail},
            {$addToSet: {sectors_following: sector_name} }
        ).exec()
    }
    async user_remove_sector(u_mail,sector_name) {
        return await   User.update(
            {email: u_mail},
            {$pull: {sectors_added: { $in: [ sector_name ] } }},{multi:true}
        )
    }

    async user_add_sector(u_mail, sector_name) {
        return await User.update(
            {email: u_mail},
            {$addToSet: {sectors_added: sector_name} }
        ).exec();
       // await User.findById(user_id).select("-hash -salt -__v").exec()
    }
}

module.exports = new UsersService();
