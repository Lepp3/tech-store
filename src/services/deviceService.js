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
    }
}



export default deviceService;