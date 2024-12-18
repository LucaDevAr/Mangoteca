import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pages: [{ type: String, required: true }], // URLs de las imágenes de las páginas
    manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
}, { timestamps: true });

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;
