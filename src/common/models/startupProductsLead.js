
import mongoose from 'mongoose';
import { CLOSED, CONTACTED, CONVERTED, PENDING } from '../constants/enum';
const Schema = mongoose.Schema;

const startupProductsLeadSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    phoneNumber: {
        type: Number,
        trim: true,
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
    },

    startupProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StartupProducts",
        required: true
    },
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

startupProductsLeadSchema.set('versionKey', false);

export default mongoose.model('StartupProductsLead', startupProductsLeadSchema);
