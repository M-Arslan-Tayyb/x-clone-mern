import mongoose from "mongoose";
import dns from "node:dns/promises";  // Add this import, this will resolve SRV lookup errors
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const mongoUri = ENV.MONGO_URI;

        if (!mongoUri) {
            console.error("Error: MONGO_URI is not defined in environment variables.");
            process.exit(1);
        }

        // Set DNS servers before connect (fixes SRV lookup)
        await dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

        const conn = await mongoose.connect(mongoUri);

        console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// Handle graceful shutdown (unchanged)
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
});
