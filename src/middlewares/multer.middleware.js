import multer from "multer"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(join(__dirname, '..', '..', 'public') , "directory");
        const destinationPath = join(__dirname, '..', '..', 'public') ;
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage : storage})

export default upload;

// app.post("/postImage", upload.single("file1") , (req,res)=>{
//     console.log("entered the post.")
// })