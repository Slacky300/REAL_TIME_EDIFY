import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },

    content: {
        type: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    isPublic: {
        type: Boolean,
        default: false
    },

},{timestamps: true});


export default mongoose.model("DocumentModel", DocumentSchema);