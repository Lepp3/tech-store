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
        res.redirect('/device/catalog');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('device/create', {error: error, deviceData});
    }
    
});


deviceController.get('/:deviceId/details', async (req,res) =>{
    const deviceId = req.params.deviceId;
    try{
        const device = await deviceService.getOneDevice(deviceId);
        if(!device){
            res.redirect('404');
        }else{
            
            const isOwner = (device.ownerId).toString() === req.user.id;
            res.render('device/details', {deviceData: device, isOwner});
        }
    }catch(err){
        const errorMsg = getErrorMessage(err);
        res.render('/catalog', {error: errorMsg});
    }
    
})

















export default deviceController;