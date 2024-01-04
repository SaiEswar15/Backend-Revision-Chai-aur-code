//remember to have a file
const fs = require("fs/promises")

export async function appendingFile()
{
    try
    {
        let a = await fs.appendFile("./data3.txt","not so happy")
        try
        {
            let r = await fs.readFile("./data3.txt","utf-8")
            console.log(r.toString())
        }
        catch
        {
            console.log("error reading the file")
        }
    }
    catch
    {
        console.log("error appending the file")
    }
}

appendingFile();