import { Router } from "express";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/getErrorMessage.js";
import { isAuth } from "../middlewares/authMiddleware.js";


const homeController = Router();

homeController.get('/',async (req,res)=>{
    try{
        const latestDevices = await deviceService.getLatestThree();
        res.render('home', {devices:latestDevices});
    }catch(err){
        const error = getErrorMessage(err);
        res.render('home', {error:error});
    }
    
});

homeController.get('/about', (req,res)=>{
    res.render('about');
});


homeController.get('/profile', isAuth ,async (req,res)=>{
    const ownDevices = await deviceService.getAllDevices({ownerId: req.user.id});
    const preferredDevices = await deviceService.getAllDevices({preferredBy: req.user.id})

    res.render('profile', {ownDevices, preferredLaptops: preferredDevices});
})


export default homeController;