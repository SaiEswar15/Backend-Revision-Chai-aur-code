//find a document with username, email, unique_id
//find a feild from the document which is array
//pushing the new object into the array

//best case :
const postCartItemsSingleSearch = async (req, res) => {
    try {
        const { email, _id, Title, Price, Quantity, Image, Category } = req.body;

        // Update the user's cartItems array in a single call
        const updatedUser = await userSchema.findOneAndUpdate(
            { "email": email },
            { $push: { cartItems: { _id, Title, Price, Quantity, Image, Category } } },
            { new: true, upsert: true }
        );

        return res.json(updatedUser);
    } catch (error) {
        console.error("Error in postCartItems:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCartQuantitySingleSearch = async (req, res) => {
    try {
        let { email, id } = req.body;

        const updatedUser = await userSchema.findOneAndUpdate(
            { "email": email, "cartItems._id": id },
            {
                $set: {
                    "cartItems.$.Quantity": {
                        $sum: ["$cartItems.$.Quantity", 1]
                    }
                }
            },
            { new: true }
        );

        return res.json(updatedUser);
    } catch (error) {
        console.error("Error in updateCartItems:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteItemsSingleSearch = async (req, res) => {
    try {
        let { email, id } = req.body;

        const updatedUser = await userSchema.findOneAndUpdate(
            { "email": email },
            { $pull: { "cartItems": { "_id": id } } },
            { new: true }
        );

        return res.json(updatedUser);
    } catch (error) {
        console.error("Error in deleteItems:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


//worst case :
const postCartItemsTwoSearch = async(req,res)=>{

    

    let {email,_id,Title, Price, Quantity, Image, Category} = req.body;
    
    let data = await userSchema.findOne({"email" : email})

    data.cartItems.push({_id,Title, Price, Quantity, Image, Category})

    await userSchema.updateOne({"email" : email}, { $set: { cartItems: data.cartItems } })
    
    return res.json(await userSchema.findOne({"email" : email}));
}

const updateCartQuantityTwoSearch = async(req,res)=>{

    

    let {email,id} = req.body;
    
    let data = await userSchema.findOne({"email" : email})

    let dataItem = data.cartItems.find((el)=>{
        return el._id === id;
    })
    
    dataItem.Quantity = (dataItem.Quantity || 0) + 1;

    await userSchema.updateOne({"email" : email}, { $set: { cartItems: data.cartItems } })
    
    return res.json(await userSchema.findOne({"email" : email}));
}

const deleteItemsTwoSearch = async (req,res)=>{
    
    let {email,id} = req.body;

    console.log(email, "email");
    console.log(id, "id");
    
    let data = await userSchema.findOne({"email" : email})

    let dataItem = data.cartItems.filter((el)=>{ 
        return el._id !== id;   
    })
    
    // data.cartItems.splice(dataItem, 1);

    await userSchema.updateOne({"email" : email}, { $set: { cartItems: dataItem} })
    
    return res.json(await userSchema.findOne({"email" : email}));
    
}
