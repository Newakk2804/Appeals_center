import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AppealSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,

    },
    answer: {
        type: String
    },
},
    {
        timestamps: true,
    });

export default mongoose.model("Appeal", AppealSchema);