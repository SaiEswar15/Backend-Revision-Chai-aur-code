const fs = require("fs/promises");
const fileName = "myfile.txt";
const fileContent = "Newton School";
const writeFile = async (fileName, fileContent) => {
  // write code here
  // dont change function name
  try
  {
    let c = await fs.appendFile(fileName, fileContent)
    try
    {
      let r = await fs.readFile(fileName)
      console.log(r.toString())
    }
    catch
    {
      console.log("error reading the file")
    }
  }
  catch
  {
    console.log("error creating a file");
  }
};

writeFile(fileName, fileContent);

export { writeFile };