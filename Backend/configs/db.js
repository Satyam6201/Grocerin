import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database Connected");
        });
        
        // Connect to MongoDB with database name
        await mongoose.connect(`${process.env.MONGODB_URI}/grocerin`);
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;
