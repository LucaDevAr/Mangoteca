import mongoose from 'mongoose';import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Obtén el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Especifica la ruta del archivo .env
dotenv.config({ path: join(__dirname, "../../.env") });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
