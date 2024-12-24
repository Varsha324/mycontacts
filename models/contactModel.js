const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
   //link the contact to the user(generator)id
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type: String,
        requires : [true,"please add the contact name"],
    },
    email:{
        type: String,
        requires : [true,"please add the email address"],
    },
   number:{
        type: String,
        requires : [true,"please add the pnone number"],
    },
},
{
    timestamps: true,
}
);
module.exports= mongoose.model("Contact",contactSchema);