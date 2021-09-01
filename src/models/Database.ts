import mongoose, { Schema } from "mongoose";

const schema: Schema = new Schema({
    id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

export default mongoose.model("Database", schema);