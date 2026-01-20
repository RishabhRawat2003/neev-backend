
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
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

adminSchema.set('versionKey', false);

export default mongoose.model('Admin', adminSchema);
