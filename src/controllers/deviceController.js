import {Router} from 'express';


const deviceController = new Router();

deviceController.get('/catalog', (req,res)=>{
    res.render('device/catalog');
})

















export default deviceController;