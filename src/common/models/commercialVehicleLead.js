
import mongoose from 'mongoose';
import { CLOSED, CONTACTED, CONVERTED, PENDING } from '../constants/enum';
const Schema = mongoose.Schema;

const commercialVehicleLeadSchema = new Schema({
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

    commercialVehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommercialVehicles",
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

commercialVehicleLeadSchema.set('versionKey', false);

export default mongoose.model('CommercialVehicleLead', commercialVehicleLeadSchema);
