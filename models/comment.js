const {Schema,model} =require("mongoose");

const commentSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        // kis blog par comment hai
        type: Schema.Types.ObjectId,
        ref:"blog",
    },
    createdBy :{
        // kis user ne comment kiya hai
        type: Schema.Types.ObjectId,
        ref:"user",
        

    }
},{timestamps:true});

const Comment = model("comment",commentSchema);

module.exports = Comment;