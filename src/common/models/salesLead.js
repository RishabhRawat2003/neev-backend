
import mongoose from 'mongoose';
import { CLOSED, CONTACTED, CONVERTED, PENDING } from '../constants/enum';
const Schema = mongoose.Schema;

const salesLeadSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    phoneNum: {
        type: Number,
        trim: true,
    },
    experienced: {
        type: Boolean,
        default: false
    },
    background: {
        type: String,
        trim: true
    },
    goals: {
        type: String,
        trim: true
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

salesLeadSchema.set('versionKey', false);

export default mongoose.model('SalesLead', salesLeadSchema);
