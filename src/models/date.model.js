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
        },
        date: {
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


var PhotoModelOG = mongoose.model('PhotoOG', PhotosSchema );

export default PhotoModelOG;