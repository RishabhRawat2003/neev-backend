
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const startupProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    key_features: {
        type: [String]
    },

    images: {
        type: [String]
    },

    videos: {
        type: [String],
        default: [],
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    manufacturer_details: {
        company_name: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        website: {
            type: String,
            trim: true
        }
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

startupProductsSchema.set('versionKey', false);

export default mongoose.model('StartupProducts', startupProductsSchema);
