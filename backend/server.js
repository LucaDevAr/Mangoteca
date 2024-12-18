import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { fileURLToPath } from "url";
import path from "path";
import errorHandler from './middlewares/errorHandler.js';
import mangaRoutes from './routes/mangaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js'
// import genreRoutes from "./routes/genreRoutes.js"
// import favoritesRoutes from "./routes/favoritesRoutes.js"
// import listsRoutes from "./routes/listsRoutes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse application/json

// Rutas
app.use('/api/manga', mangaRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chapter', chapterRoutes);
// app.use('/api/comment', chapterRoutes);
// app.use('/api/genres', genreRoutes);
// app.use('/api/favorites', favoritesRoutes);
// app.use('/api/lists', listsRoutes);

// Manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
