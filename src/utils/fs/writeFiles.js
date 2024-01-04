const fs = require("fs/promises")

async function writingFile()
{
    try{
        let w = await fs.writeFile("./data4.txt","hello there welcome to coding")
        try
        {
            let r = await fs.readFile("./data3.txt")
            console.log(r.toString());
        }
        catch
        {
            console.log("error reading the file")
        }
        
    }
    catch
    {
        console.log("error writing the file")
    }

}

writingFile();