//YT TUTORIAL: https://youtu.be/EVOFt8Its6I
//IMPORTANT FOR FRONTEND: 11:00

const express = require("express");
const multer = require("multer");

const app = express();

//determines destination of files as well as file name at destination
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './pdfs')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
});

const upload = multer({storage: fileStorageEngine})

//upload one file at a time
app.post('/single', upload.single('pdf'), (req, res) =>  {
    console.log(req.file);
    res.send('Single File upload success');
});

//upload a max of 2 files at the same time
app.post("/multiple", upload.array("pdfs", 2), (req, res) => {
    console.log(req.files);
    res.send('Multiple Files upload success');
});

//view on http://localhost:5000
app.listen(5000);