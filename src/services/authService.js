import User from '../models/User.js'
import bcrypt from 'bcrypt';

import { generateToken } from '../utils/tokenUtils.js';





export const authService = {
    async register(userData){
        //check if email is in use
        const user = await User.findOne({email: userData.email});
       
        if(user){
            throw new Error('User already exists!');
        };

        //check if password and repassword match
        if(userData.password !== userData.rePassword){
           throw new Error('Password mismatch!');
        }

        const createdUser = await User.create(userData);

        const token = generateToken(createdUser);

        return token;
    },

    async login(userData){
        const user = await User.findOne({email: userData.email});

        if(!user){
            throw new Error('Invalid username or password!');
        };

        const isValid = await bcrypt.compare(userData.password, user.password);

        if(!isValid){
            throw new Error('peerasi');
        };

       const token = generateToken(user);
        
        return token;
        
    }
    
}