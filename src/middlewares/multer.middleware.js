import multer from "multer"


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "/public")
    },
    filename : function(req,file,cb)
    {
        cb(null, file.fieldname + file.originalname )
    }
})

const upload = multer({storage : storage})

export default upload;

// app.post("/postImage", upload.single("file1") , (req,res)=>{
//     console.log("entered the post.")
// })