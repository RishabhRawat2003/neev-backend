import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commercialVehicleDealerSchema = new Schema({
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
        type: Number, // years of experience
        min: 0
    },

    specialties: {
        type: [String], // e.g. ["Trucks", "Buses", "Construction Vehicles"]
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
        type: String // image URL or path
    },

    certifications: {
        type: [String], // e.g. ["ISO 9001", "OEM Certified"]
        default: []
    },

    areasServed: {
        type: [String], // e.g. ["Delhi", "Noida", "Gurgaon"]
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

commercialVehicleDealerSchema.set('versionKey', false);

export default mongoose.model(
    'CommercialVehicleDealer',
    commercialVehicleDealerSchema
);
