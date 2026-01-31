
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commercialVehiclesSchema = new Schema({
     name: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String, // e.g. Truck, Bus, Tempo
        trim: true
    },

    category: {
        type: String, // e.g. Heavy, Light, Mini
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

    image: {
        type: [String] // image URLs or paths
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

    capacity: {
        type: String // seating or load description
    },

    rto_passing_location: {
        type: String,
        trim: true
    },

    insurance_validity: {
        type: Date
    },

    passing_in_ton: {
        type: Number
    },

    number_of_tyre: {
        type: Number
    },

    tyre_condition_percentage: {
        type: Number,
        min: 0,
        max: 100
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

commercialVehiclesSchema.set('versionKey', false);

export default mongoose.model('CommercialVehicles', commercialVehiclesSchema);
