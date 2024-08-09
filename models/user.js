import { Schema, model,models } from "mongoose";


const userSchema = new Schema({
    username:{
        type:"String",
        required:[true,'Username is Required'],
        unique:[true,'Username should be Unique'],
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    },
    email:{
        type:String,
        required:[true,'Email is Required']
    },
    message:{
        type:Array
    }
})

const User = models.User || model("User",userSchema);
export default User;