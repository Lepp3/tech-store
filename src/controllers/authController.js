import { Router } from "express";
import { authService } from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { getErrorMessage } from "../utils/getErrorMessage.js";

const authController = Router();


authController.get('/register', (req,res)=>{
    res.render('auth/register');
});

authController.post('/register', async (req,res)=>{
   const userData = req.body;

    try{
        const token = await authService.register(userData);

        res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/auth/register');
    }catch(err){
        const error = getErrorMessage(err);
        
        return res.render('auth/register', {error: error,userData});
    }
   

   
});


authController.get('/login', (req,res)=>{
    res.render('auth/login');
});


authController.post('/login', async (req,res)=>{
    const userData = req.body;

    try{
    const token = await authService.login(userData);

    res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});

    res.redirect('/');
    }catch(err){
        const error = getErrorMessage(err);
        return res.render('auth/login', {error:error, userData});
    }

    
});


authController.get('/logout', (req,res)=>{
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
})


export default authController;