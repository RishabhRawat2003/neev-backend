import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const preownedVehicleDealerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        trim: true
    },

    experience: {
        type: Number, // years
        min: 0
    },

    specialties: {
        type: [String], // e.g. ["Sedans", "SUVs", "Hatchbacks"]
        default: []
    },

    email: {
        type: String,
        lowercase: true,
        trim: true
    },

    whatsappLink: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    image: {
        type: String // image URL/path
    },

    certifications: {
        type: [String], // e.g. ["RTO Verified", "Company Certified"]
        default: []
    },

    areasServed: {
        type: [String], // e.g. ["Mumbai", "Pune"]
        default: []
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

preownedVehicleDealerSchema.set('versionKey', false);

export default mongoose.model(
    'PreownedVehicleDealer',
    preownedVehicleDealerSchema
);
