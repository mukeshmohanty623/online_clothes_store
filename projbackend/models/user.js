var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    lastname : {
        type : String,
        maxlength : 32,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    userinfo : {
        type : String,
        trim : true
    },
    epassword :{
        type : String,
        required : true

    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchases : {
        type : Array,
        default : []
    },
    refcode : {
        type : ObjectId
    },
    reward : {
        type: Number,
        default : 0
    }
  },{timestamps : true});

  
userSchema.virtual('password')
          .set(function(password){
              this._password = password;
              this.salt = uuidv1();
              this.epassword = this.securePassword(password);
          })
          .get(function(){
              return this._password;
          });

userSchema.methods = {
    authenticate : function(plainPassword){
        return this.securePassword(plainPassword) === this.epassword ;
    },
    
    securePassword : function(plainPassword){
        if(!plainPassword){
            return "";
        }
        else{
            try{
               return crypto.createHmac('sha256', this.salt)
                            .update(plainPassword)
                            .digest('hex');
            }
            catch(err){
                return "";
            }
        }
    }

}

 
  module.exports = mongoose.model("User",userSchema);