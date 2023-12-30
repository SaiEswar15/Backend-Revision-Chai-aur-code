const multer = require("multer");
const path = require("path");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../public")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, Date.now() + file.originalname)
//     }
//   })

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});
  
/**
 * Configures Multer middleware for handling multipart/form-data file uploads.
 * Sets the disk storage engine and destination folder.
 */
const upload = multer({
  storage,
});
 
// app.post("/postImage", upload.single("file1") , (req,res)=>{
//     console.log("entered the post.")
// })

module.exports = {upload};