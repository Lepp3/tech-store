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
            return res.redirect('404');
        }else{
            
            const isOwner = (device.ownerId).toString() === req.user?.id;
            const hasPreferred = device.preferredList.includes(req.user?.id);
            res.render('device/details', {deviceData: device, isOwner, hasPreferred});
        }
    }catch(err){
        const errorMsg = getErrorMessage(err);
        res.render('device/catalog', {error: errorMsg});
    }
    
});


deviceController.get('/:deviceId/delete', async (req,res)=>{
    const deviceId = req.params.deviceId;
    const userId = req.user?.id;
    try{
        const device = await deviceService.getOneDevice(deviceId);
        if(userId !== device.ownerId && !userId){
            return res.redirect('/');
        }else{

        }
    }catch(err){
        const errorMsg = getErrorMessage(err);
        res.render('device/catalog', {error: errorMsg});
    }
});

deviceController.get('/:deviceId/edit', async(req,res)=>{
    const deviceId = req.params.deviceId;
    const userId = req.user?.id;
    try{
        
    }catch(err){

    }
});


deviceController.get('/:deviceId/prefer', isAuth, async(req,res)=>{
    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    
    
    try{
        await deviceService.preferDevice(deviceId,userId);
        res.redirect(`/device/${deviceId}/details`);
    }catch(err){
        const errorMsg = getErrorMessage(err);
        res.redirect('/404');
        
    }


})

















export default deviceController;