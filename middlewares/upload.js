const multer=require('multer');
const fs=require('fs');
const path=require('path');

const uploadDir=path.join(__dirname,'uploads');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadDir);
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({
    storage:storage,
    limits:{
        fileSize:10*1024*1024
    },
    fileFilter:function(req,file,cb){
        const fileType=/jpeg|jpg|png/;
        const extname=fileType.test(path.extname(file.originalname).toLowerCase());
        const mimeType=fileType.test(file.mimetype);
        if(extname && mimeType){
            cb(null,true);
        }
        else{
            cb(new Error('only jped and png file allowed'));
        }
    }
});

module.exports=upload;
