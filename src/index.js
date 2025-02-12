import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { auth } from './middlewares/authMiddleware.js';

const app = express();


//Db setup

try{
    const uri = 'mongodb://localhost:27017/techStore'; //replace with db name of your choice
    await mongoose.connect(uri);
    console.log('DB Connected')
}catch(err){
    console.error('Cannot connect to DB');
    console.log(err);
}

//handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        setTitle(title){
            this.pageTitle = title;

            return ''
        }
    }
}))

app.set('view engine', 'hbs');
app.set('views', './src/views');

//express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(auth);
app.use(routes);

//routes






app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));