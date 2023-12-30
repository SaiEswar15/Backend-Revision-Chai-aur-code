const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = new Schema(
    {
        videoFile : 
        {
            type : String,
            required : true
        },
        thumbnail : 
        {
            type : String,
            required : true
        },
        title : 
        {
            type : String,
            required : true
        },
        description : 
        {
            type : String,
            required : true
        },
        duration : 
        {
            type : Number, //comes from cloudnary
            required : true
        },
        views : 
        {
            type : Number, 
            default : 0
        },
        isPublished : 
        {
            type : boolean, 
            default : true
        },
        owner :
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps : true
    })

videoSchema.plugin(mongooseAggregatePaginate)
const video = mongoose.model("Video", videoSchema)

module.exports = {video};

