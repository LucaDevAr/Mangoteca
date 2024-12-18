import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true },
    pages: [{ type: String, required: true }],
    publicationDate: { type: Date, required: true },
});

const mangaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["En emisión", "Finalizado"],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        periodicity: {
            type: String,
            enum: ["Diario", "Semanal", "Mensual", "Irregular"],
            required: true,
        },
        chapters: [chapterSchema],
    },
    {
        timestamps: true,
    }
);

const Manga = mongoose.model('Manga', mangaSchema);

export default Manga;
