
import mongoose from 'mongoose';
import { CLOSED, CONTACTED, CONVERTED, PENDING } from '../constants/enum';
const Schema = mongoose.Schema;

const preownedVehicleDealerLeadSchema = new Schema({
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

    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreownedVehicleDealer",
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

preownedVehicleDealerLeadSchema.set('versionKey', false);

export default mongoose.model('PreownedVehicleDealerLead', preownedVehicleDealerLeadSchema);
