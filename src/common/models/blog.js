
import mongoose from 'mongoose';
import { COMMERCIALVEHICLE, EXPORTS, MARKETING, PREOWNEDVEHICLE, PROPERTY, TRADING } from '../constants/enum';
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    videos: {
        type: [String]
    },
    keywords: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        enum: [EXPORTS, MARKETING, PROPERTY, TRADING, COMMERCIALVEHICLE, PREOWNEDVEHICLE]
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

blogSchema.set('versionKey', false);

export default mongoose.model('Blog', blogSchema);
