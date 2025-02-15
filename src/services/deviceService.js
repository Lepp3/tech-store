import Device from "../models/Device.js";



const deviceService = {
   async getAllDevices(filter = {}){
        let query =  Device.find({});
        if(filter.ownerId){
            query = query.find({ownerId: filter.ownerId})
        }

        if(filter.preferredBy){
            query = query.find({preferredList: filter.preferredBy});
        }
        
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
    async deleteDevice(deviceId,userId){
        const device = await this.getOneDevice(deviceId);
        if(!device.ownerId.equals(userId)){
            throw new Error('Only owner can delete this offer!');
        }

        return Device.findByIdAndDelete(deviceId);
    },
    async preferDevice(deviceId,userId){
        const device = await Device.findById(deviceId);
        if(device.ownerId.equals(userId)){
            throw new Error('Cannot prefer own offer!');
        }
        if(device.preferredList.includes(userId)){
            console.log('problema e v masiva');
            throw new Error('You already preferred this offer!');
        }

        device.preferredList.push(userId);

        return device.save();
    },
    async updateDevice(deviceId,deviceData,userId){
        const device = await this.getOneDevice(deviceId);
        if(!device.ownerId.equals(userId)){
            throw new Error('Only owner can edit this offer!');
        }

        return Device.findByIdAndUpdate(deviceId,deviceData, {runValidators:true});
    }
}



export default deviceService;