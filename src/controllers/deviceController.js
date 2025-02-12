import {Router} from 'express';
import deviceService from '../services/deviceService.js';


const deviceController = new Router();

deviceController.get('/catalog', (req,res)=>{
    res.render('device/catalog');
});

deviceController.get('/create', (req,res)=>{
    res.render('device/create');
});

deviceController.post('/create', async (req,res)=>{
    const deviceData = req.body;
    const userId = req.user?.id;
    await deviceService.createDevice(deviceData,userId);
    res.redirect('/catalog');
})

















export default deviceController;