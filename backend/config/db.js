import mongoose from "mongoose";

export const  connectDB = async () =>{
    // IMPORTANT: Never hardcode passwords in code!
    // Always use environment variables for production
    // Set MONGO_URI in your .env file or deployment platform
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
        console.error("MONGO_URI environment variable is not set!");
        throw new Error("Database connection string is missing. Please set MONGO_URI environment variable.");
    }
    
    await mongoose.connect(mongoURI)
        .then(() => console.log("DB Connected"))
        .catch((err) => {
            console.log("DB Connection Error:", err);
            throw err;
        });
}

