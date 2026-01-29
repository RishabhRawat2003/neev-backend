
import mongoose from 'mongoose';
import { CLOSED, CONTACTED, CONVERTED, EXPORTS, MARKETING, PENDING, PROPERTY, TRADING } from '../constants/enum';
const Schema = mongoose.Schema;

const leadSchema = new Schema({
    leadType: {
        type: String,
        enum: [MARKETING, PROPERTY, TRADING, EXPORTS],
        required: true,
    },

    // Common fields
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    // Marketing
    companyName: String,
    contactPerson: String,
    category: String,

    // Property
    propertyContactPerson: String,

    // Trading
    startupName: String,
    productName: String,
    productCategory: String,
    productPrice: Number,

    // Exports
    exportCompanyName: String,
    exportProductCategory: String,

    status: {
        type: String,
        enum: [PENDING, CONTACTED, CONVERTED, CLOSED],
        default: PENDING
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

leadSchema.set('versionKey', false);

export default mongoose.model('Lead', leadSchema);
