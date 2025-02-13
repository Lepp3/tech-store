import {Router} from 'express';
import deviceService from '../services/deviceService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/getErrorMessage.js';



const deviceController = new Router();

deviceController.get('/catalog', isAuth ,(req,res)=>{
    res.render('device/catalog');
});

deviceController.get('/create', (req,res)=>{
    res.render('device/create');
});

deviceController.post('/create', isAuth ,async (req,res)=>{
    const deviceData = req.body;
    const userId = req.user?.id;
    try{
        await deviceService.createDevice(deviceData,userId);
        res.redirect('/catalog');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('/create', {error: error, deviceData});
    }
    
})

















export default deviceController;