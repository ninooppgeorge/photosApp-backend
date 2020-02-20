//package imports
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import photoRoute from './routes/photos.route';
import photoaRoute from './routes/photosa.route';

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/photoapp';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(morgan('tiny'));

app.use('/photos', photoRoute)
app.use('/photosa', photoaRoute)


//app listen
app.listen(3000, () => {
	console.debug('App listening on :3000');
});