const {Schema,model} = require("mongoose");

const blogSchema = new Schema({

    title:{
        type: String,
        required: true,
    },

    body:{
        type: String,
        required:true,
    },
    coverImageURL:{

        type:String,

    },
    createdBy:{
        // banya kiske dwara gya to vo too user schema se lana hoga
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps:true});

const Blog = model("blog",blogSchema);

module.exports = Blog;
