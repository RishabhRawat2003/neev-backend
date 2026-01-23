
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const marketingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        enum: ["product", "service", "company"],
        required: true,
        index: true,
    },

    description: {
        type: String,
        required: true,
    },

    features: {
        type: [String],
        default: [],
    },

    link: {
        type: String, // website / landing page / product page
        trim: true,
    },

    usersAssociated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
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

marketingSchema.set('versionKey', false);

export default mongoose.model('Marketing', marketingSchema);
