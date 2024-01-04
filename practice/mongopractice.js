db.products.aggregate([
    {
        $match : {
            author : {
                $in : ["Celine", "Sadie", "Gail"]
            },
        }
    },
    {
        $group : {
            _id : "$id",
            writer : {
                $first : "$author"
            },
            name : {
                $first : "$title"
            },
            newid : {
                $sum : "$id"
            },
            namedup : {
                $first : "$title"
            }
        }
    },
    {
        $project : {
            _id : 0,
            writer : 1,
            name : 1,
            newid : 1,
            namedup : 1
        }
    },
    {
        $sort : {
            newid : 1,

        }
    },
    {
        $count : "the total count of documents :"
    }
]).pretty()