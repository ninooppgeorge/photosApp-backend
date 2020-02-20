import { Router } from 'express';
import {check, validationResult}  from 'express-validator';
import multer from 'multer';
import PhotoModel from '../models/photo.model';
import PhotoModelOG from '../models/date.model';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage })

var photoRoute = Router();

photoRoute.get('/', (req, res) =>{

    var page = req.query.page;
    var count = req.query.count;

    PhotoModel.find().then((data)=>{

        var piccount = 0;
        var finaldata = [];
        var totalpics = 0;

        data.forEach((val,index)=>{
            console.log(val.photos.length)
            totalpics = totalpics+ ( val.photos.length);
        })

        for(var i=0;i<data.length;i++){
            // piccount = ((data[i].photos.length+1)>count) ? count : data[i].photos.length;
            var fcount = (data[i].photos.length>count)? count: data[i].photos.length;
            piccount = parseInt(piccount+ fcount);
            if(piccount>=count){
                finaldata.push(data[i].photos);
                break;
            }else{
                finaldata.push(data[i].photos);
            }
        }
        console.log(piccount,count,totalpics)

        res.send(finaldata);
    }).catch((err)=>{
        res.send(err);
    })
});

photoRoute.put('/',upload.single('photo'), (req, res) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var d = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()-4);
    //var df = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()+1);
    
    let photo = {};
    photo.photographer = req.body.photographer;
    photo.email = req.body.email;
    photo.imageName = req.file.filename;

    //get todays date
    //check if there is a date 
    
    PhotoModelOG.find({date: d}).then((data)=>{
        if(data.length<1){
            let photoObj = new PhotoModel();
            photoObj.date = d;
            photoObj.title = "test";
            photoObj.photos = photo;
            
            photoObj.save().then((saveddata)=>{
                res.send(saveddata);
            }).catch((err)=>{
                res.send(err);
            })
        }else{
            var docId = data[0]._id;
            PhotoModel.findById(docId).then((currentDateDoc)=>{
                currentDateDoc.photos.push(photo);
                currentDateDoc.save();
                res.send(currentDateDoc);
            }).catch((err)=>{
                res.send(err);
            })
        }
    }).catch((err)=>{
        res.send(err);

    });
    
    
    
    
    
    

});



export default photoRoute;