const fs = require("fs/promises")

export async function deleteFile()
{
    await fs.unlink ("./data.txt",(err)=>{
        if(err)
        {
            console.log("error deleting the file")
        }
        else
        {
            console.log("delete success")
        }
    })
}