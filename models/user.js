const { Schema,model } = require("mongoose");
const {createHmac,randomBytes} = require('crypto');


const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        
    },
    password: {
        type: String,
        required: true,

    },
    profileImageURL: {
        type: String,
        default: "/images/default.png",
    },
    role: {
        type: String,
        // role sirf "USER" ya "ADMIN" ho sakta hai
        //  "user", "admin", "MOD" → ❌ reject
        // enum ke karan ye ata ye ek array hi hota
        enum: ["USER", "ADMIN"],
        default: "USER"
    }

}, { timestamps: true });


// naye pre mai async  lagta hai pehle next lagta thaa
userSchema.pre("save", async function(next){

    // this == user hai
    const user  = this;

    if(!user.isModified("password"))return ;

    // user pass ko hash karnege by using crypto hash package
    const salt  =randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest("hex");

    // this.salt = salt;
    // this.password = hashedPassword;

    user.salt = salt;
    user.password = hashedPassword;

    
})


const User = model("user",userSchema);

module.exports = User;