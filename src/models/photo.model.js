import mongoose from 'mongoose';


var Schema = mongoose.Schema;
var PhotosSchema = new Schema({
        pid: {
            type: Schema.Types.ObjectId
        },
        photographer: {
            type: String
        },
        email: {
            type: String
        },
        imageName: {
            type: String
        }
    },
    { 
        versionKey: false,
        timestamps: true
    }
);

var DateSchema = new Schema({
        title: {
            type: String
        }, 
        date: {
            type: Date
        },
        photos: [{
            type: Object,
            ref: 'PhotosSchema'
        }]
    },
    {
        versionKey: false,
    }
)


var PhotoModel = mongoose.model('Photo', DateSchema );

export default PhotoModel;