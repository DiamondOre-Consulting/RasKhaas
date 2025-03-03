import mongoose from 'mongoose';

const enquireSchema = new mongoose.Schema({
    fullName:{
            type:String,
            required:true
    },
    email:{
        type:String,
        required : true
    },
    phone:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }

} , {timestamps:true})

export const Enquire = mongoose.model("Enquire" , enquireSchema )