import {Router} from 'express';
import deviceService from '../services/deviceService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/getErrorMessage.js';



const deviceController = new Router();

deviceController.get('/catalog', async (req,res)=>{
    try{
        const devices = await deviceService.getAllDevices();
        res.render('device/catalog', {devices});
    }catch(err){
        res.redirect('/404')
    }
    
});

deviceController.get('/create', isAuth , (req,res)=>{
    res.render('device/create');
});

deviceController.post('/create', isAuth ,async (req,res)=>{
    const deviceData = req.body;
    const userId = req.user.id;
    try{
        await deviceService.createDevice(deviceData,userId);
        res.redirect('/devices/catalog');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('/create', {error: error, deviceData});
    }
    
})

















export default deviceController;