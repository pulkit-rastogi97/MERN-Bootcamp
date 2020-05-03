const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true,
    },

    lastname : {
        type : String,
        required : false, // or No statement
        maxlength : 32,
        trim : true,
    },

    email : {
        type : String,
        trim : true,
        unique : true,
        required : true,
    },

    userinfo : {
        type : String,
        trim : true,
    },

    encry_password : {
        type : String,
        required : true,
    },

    salt : String,

    //Roles should always be there on every app
    role : {
        type : Number,
        default : 0,
    },

    purchases : {
        type : Array,
        default : [],
    }

}, {timestamps : true});

//Schema virtuals
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.getSecurePassword(password);
    })
    .get(function(){
        return this._password;
    })


//Schema methods
userSchema.methods = {

    authenticate: function(plainPassword)
    {
        return this.getSecurePassword(plainPassword) === this.encry_password;
    },


    getSecurePassword: function(plainPassword)
    {
        if (!password)
            return "";

        try{

            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');

        }
        catch(err)
        {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema );