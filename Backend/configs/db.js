import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database Connected");
        });
        
        await mongoose.connect(`${process.env.MONGODB_URI}/grocerin`, {
            maxPoolSize: 100,
            minPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;
