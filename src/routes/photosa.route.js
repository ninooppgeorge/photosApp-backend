import { Router } from 'express';
import {check, validationResult}  from 'express-validator';
import multer from 'multer';
import PhotoModel from '../models/photo.model';
import PhotoModelOG from '../models/date.model';
import fs from 'fs';
// import sharp from 'sharp';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage })

var photoaRoute = Router();

photoaRoute.get('/', (req, res) =>{

    var page = req.query.page;
    var count = req.query.count;

    PhotoModelOG.find().then((data)=>{
        var totallength = data.length;
        var perpagearray = [];
        var sa = data.reverse()
        var numberofpages = totallength/count;
        for(var i=0;i<numberofpages;i++){
            var startC = parseInt(i*count);
            var endC = parseInt(startC+ parseInt(count));
            perpagearray.push(sa.slice(startC,endC));
        }
        var finaldata = perpagearray[page];
        res.send(finaldata);
    }).catch((err)=>{
        res.send(err);
    })
});

photoaRoute.get('/uploads/:fileName', (req,res)=>{
    var filename = req.params.fileName;
    res.sendFile('./uploads/'+filename, { root: process.cwd() });
});

photoaRoute.put('/',upload.array('photo'), (req, res) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // const { filename: image } = req.file 

    // await sharp(req.file.path)
    //  .resize(500)
    //  .jpeg({quality: 50})
    //  .toFile(
    //      path.resolve(req.file.destination,'resized',image)
    //  )
    //  fs.unlinkSync(req.file.path)


    console.log(req.file);
    console.log(req.headers);
    console.log(JSON.stringify(req.body.photo));
    console.log(req.photo)
    console.log(req.files);
    var d = new Date().getFullYear()+"-"+new Date().getMonth() +"-"+ (new Date().getDate());
    //var df = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()+1);
    let reqF = [];
    req.files.forEach((val,index)=>{
        let photo = {};
        photo.photographer = req.body.photographer;
        photo.email = req.body.email;
        photo.imageName = val.filename;
    
        let photoObj = {};
        photoObj.photographer = req.body.photographer;
        photoObj.email = req.body.email;
        photoObj.imageName = val.filename;
        photoObj.date = d;
        
        reqF.push(photoObj)
    })
    
    PhotoModelOG.insertMany(reqF, (err,docs)=>{
        if (err){ 
            return res.send(err);
        } else {
          return res.send(docs);
        }
    })


    //get todays date
    //check if there is a date 



});



export default photoaRoute;