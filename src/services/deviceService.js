import Device from "../models/Device.js";



const deviceService = {
    createDevice(data,userId){
        const result = Device.create({...data,
            ownerId: userId,
        });

        

        return result;
    }
}



export default deviceService;