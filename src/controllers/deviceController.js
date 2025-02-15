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


deviceController.get('/:deviceId/delete', isAuth ,async (req,res)=>{
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    try{
        await deviceService.deleteDevice(deviceId,userId);
        res.redirect('/device/catalog');
    }catch(err){
        
        res.redirect('/404');
    }
   
});

deviceController.get('/:deviceId/edit', isAuth, async(req,res)=>{
    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    const device = await deviceService.getOneDevice(deviceId);
    if(!device){
        return res.redirect('/404');
    };
    if(!device.ownerId.equals(userId)) {
        return res.redirect(`/device/${deviceId}/details`);
    }
    res.render('device/edit', {deviceData:device})
});

deviceController.post('/:deviceId/edit',isAuth ,async (req,res)=>{
    const deviceId = req.params.deviceId;
    const newDeviceData = req.body;
    const userId = req.user.id;
    try{
        await deviceService.updateDevice(deviceId,newDeviceData,userId);
        return res.redirect(`/device/${deviceId}/details`);
    }catch(err){
        const errorMsg = getErrorMessage(err);
        res.render('device/edit', {deviceData: newDeviceData, error:errorMsg})
    }
    
    

})


deviceController.get('/:deviceId/prefer', isAuth, async(req,res)=>{
    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    
    
    try{
        await deviceService.preferDevice(deviceId,userId);
        
    }catch(err){
        const errorMsg = getErrorMessage(err);
        console.log(errorMsg);
        return res.redirect('/404');
        
    }

    res.redirect(`/device/${deviceId}/details`);
})

















export default deviceController;