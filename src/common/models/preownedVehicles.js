
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const preownedVehiclesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number
    },

    mileage: {
        type: Number // km/l or km
    },

    price: {
        type: Number,
        min: 0
    },

    location: {
        type: String,
        trim: true
    },

    images: {
        type: [String] // image URLs or paths
    },

    videos: {
        type: [String]
    },

    transmission: {
        type: String, // Manual / Automatic
        trim: true
    },

    fuel_type: {
        type: String, // Diesel / Petrol / CNG / Electric
        trim: true
    },

    condition: {
        type: String, // New / Used / Excellent / Good
        trim: true
    },

    owner_count: {
        type: Number
    },

    km_driven: {
        type: Number
    },

    brand: {
        type: String,
        trim: true
    },

    model: {
        type: String,
        trim: true
    },

    rto_passing_location: {
        type: String,
        trim: true
    },

    insurance_validity: {
        type: Date
    },

    link: {
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

preownedVehiclesSchema.set('versionKey', false);

export default mongoose.model('PreownedVehicles', preownedVehiclesSchema);
