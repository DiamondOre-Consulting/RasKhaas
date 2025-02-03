import mongoose from "mongoose";

export const connection = async ()=>{
    try{
        // console.log("mongo url",process.env.MONGO_URL)
        const connection = await mongoose.connect(process.env.MONGO_URL);
        if(connection){
            console.log(`connected to mongoDB `)
        }
    }
    catch(error){
        console.log(error);
        process.exit(1)
    }
}