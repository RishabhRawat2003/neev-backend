import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    company_name: {
        type: String,
        trim: true
    },

    completed_projects: {
        type: Number,
        default: 0,
        min: 0
    },

    experience: {
        type: Number, // in years
        min: 0
    },

    description: {
        type: String,
        trim: true
    },

    specialty: {
        type: String,
        trim: true
    },

    services: {
        type: [String], // e.g. ["Plumbing", "Electrical", "Civil Work"]
        default: []
    },

    link: {
        type: String
    },

    rank: {
        type: Number,
        min: 0
    },

    email: {
        type: String
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

contractorSchema.set('versionKey', false);

export default mongoose.model('Contractor', contractorSchema);
