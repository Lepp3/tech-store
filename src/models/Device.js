import {model, Schema, Types} from 'mongoose';

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    hardDisk: {
        type: String,
        required: true
    },
    screenSize: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    operationSys: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    gpu: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    preferredList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    },
});


const Device = model('Device',deviceSchema);


export default Device;