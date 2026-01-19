
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_verified:{
        type: Boolean,
        default: false
    },
    phoneNum:{
        type: String,
        required: true,
        unique: true
    },
    companyName:{
        type: String
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

userSchema.set('versionKey', false);

export default mongoose.model('User', userSchema);
