
import mongoose from 'mongoose';
import { EAST, NORTH, SOUTH, WEST } from '../constants/enum';
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String, // e.g. Apartment, Villa, Plot
        required: true,
        trim: true,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },

    beds: {
        type: Number,
        min: 0,
    },

    bath: {
        type: Number,
        min: 0,
    },

    area: {
        type: Number, // in sq ft or sq m
        required: true,
    },

    builtUpArea: {
        type: Number,
        required: true,
    },

    facing: {
        type: String,
        enum: [SOUTH, EAST, NORTH, WEST],
        trim: true
    },

    parking: {
        type: Boolean,
        default: false,
    },

    yearBuilt: {
        type: Number,
        min: 1800,
        max: new Date().getFullYear(),
    },

    overview: {
        type: String,
        trim: true,
    },

    features: {
        type: [String], // e.g. ["Lift", "Power Backup", "Gym"]
        default: [],
    },

    nearbyFacilities: {
        type: [String], // e.g. ["School", "Hospital", "Metro"]
        default: [],
    },

    mapLink: {
        type: String,
        trim: true,
    },

    whatsappLink: {
        type: String,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    images: {
        type: [String],
        default: [],
    },

    videos: {
        type: [String],
        default: [],
    },

    email: {
        type: String,
        trim: true
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

propertySchema.set('versionKey', false);

export default mongoose.model('Property', propertySchema);
