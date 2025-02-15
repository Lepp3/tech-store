import Device from "../models/Device.js";



const deviceService = {
   async getAllDevices(filter = {}){
        let query =  Device.find({});
        
        return query;
       
    },
    async getLatestThree(){
        let query = Device.find({}).sort({_id: 'desc'}).limit(3);

        return query;
    },
  async  getOneDevice(id){
        let query = Device.findById(id);
        return query;
    },
   async createDevice(data,userId){
        const result = Device.create({...data,
            ownerId: userId,
        });

        

        return result;
    },
    async deleteDevice(id){
        let query = Device.findByIdAndDelete(id);

        return query
    },
    async preferDevice(deviceId,userId){
        const device = await Device.findById(deviceId);
        if(device.ownerId.equals(userId)){
            throw new Error('Cannot prefer own offer!');
        }
        if(device.preferredList.includes(userId)){
            throw new Error('You already preferred this offer!');
        }

        device.preferredList.push(userId);

        return device.save();
    }
}



export default deviceService;