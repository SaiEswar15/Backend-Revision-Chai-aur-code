//remember to have the file to read
const fs = require("fs/promises");

export async function readingFile()
{
    
    try
    {
        let r = await fs.readFile("./data.txt","utf-8")
        console.log(r);
    }
    catch
    {
        console.log("error");
    }
}

readingFile()
