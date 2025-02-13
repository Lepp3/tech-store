import Device from "../models/Device.js";



const deviceService = {
    getAllDevices(filter = {}){
        let query = Device.find({});
        
        return query;
       
    },
    createDevice(data,userId){
        const result = Device.create({...data,
            ownerId: userId,
        });

        

        return result;
    }
}



export default deviceService;