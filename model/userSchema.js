const mongoose = require("mongoose");
const{ Schema } = mongoose;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
    name:{
        type: String,
        required:[true,"User Name is Required "],
        
    },
    email:{
        type: String,
        required:[true,"User Email is Required "],
        unique:true,
        lowercase:true,
        unique:[true,"already registered"]
    },
    password:{
        type: String,
    },
    forgotPasswordToken:{
        type: String
    },
    forgotPasswordExpiryDate:{
        type:Date,
    }
},{
    timestamps: true 
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
}) 

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id:this._id, email:this.email},
            process.env.SECRET,
            { expiresIn:"24h"}
        )
    }
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;