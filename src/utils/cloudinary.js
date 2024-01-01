import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  //this uplaod may fail so use try catch

  try 
  {
    // console.log("entered")
    // console.log(localFilePath, "local1");
    if (!localFilePath) {
      // console.log(localFilePath, "local");
      // console.log("no file path")
      return null;
    }
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", response.url);
    return response;
  } 
  catch (error) 
  {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };

// we can directly upload like this :

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result)
//   {
//     console.log(result);
//   });

// we can directly upload but in industry there will be two step process as above:
