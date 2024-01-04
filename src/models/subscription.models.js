import mongoose, {Schema} from "mongoose"

const subscriptionModel = new Schema({

    subscriber : 
    {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    channel : 
    {
        type : Schema.Types.ObjectId,
        ref : "User"
    }

},
{
    timestamps : true
})

const subscriptions = mongoose.model("Subscription", subscriptionModel )

export { subscriptions };