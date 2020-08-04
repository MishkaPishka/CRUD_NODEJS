var mongoose = require(`mongoose`);
mongoose.connect('mongodb://localhost:27017/company_db', {useNewUrlParser: true});
const user_schema = mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true

    },

    salt:{
        type: String,
        required: true
    },
    hash:{
        type: String,
        required: true
    },
    stocks_added: {
        type: Array,
        required:false
    },
    stocks_following: {
        type: Array,
        required:false
    },
    sectors_added: {
        type: Array,
        required:false
    },
    sectors_following :{
        type: Array,
        required:false
    }
})
var MyModel = mongoose.model('user_info', user_schema);

// MyModel.createCollection().then(_=> {
//     console.log('gggggggggggggg');
// }
// )

const User = module.exports = MyModel;