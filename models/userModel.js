const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require : [true,"please enter the valid name"]
    },
    email:{
        type:String,
        require : [true,"please enter the valid email"],
        unique :[true , "Email address is already taken"]
    },
    password:{
        type:String,
        require : [true,"please enter the valid password"]
    }

},{
    timestamps:true,
}
);

module.exports = mongoose.model("User",userSchema);