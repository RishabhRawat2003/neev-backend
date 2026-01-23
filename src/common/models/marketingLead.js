
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const marketingLeadSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    phoneNumber: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
    },

    marketingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marketing",
        required: true
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

marketingLeadSchema.set('versionKey', false);

export default mongoose.model('MarketingLead', marketingLeadSchema);
