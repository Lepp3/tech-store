import { Router } from "express";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/getErrorMessage.js";


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


export default homeController;