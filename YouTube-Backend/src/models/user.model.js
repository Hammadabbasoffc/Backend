import  jwt  from "jsonwebtoken";
import { Schema, mongoose } from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type:String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type:String, //cloudinary service
        required: true
    },
    coverimage:{
        type:String
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true, "Password is Required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

// this is changed
userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();

   

    // Ensure this.password is defined and a string
    if (typeof this.password !== 'string') {
        return next(new Error("Password is not a string"));
    }

    // Hash the password
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.isPasswordCorrect = async function(password){
    // if (!this.password) {
    //     return
    // }
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
