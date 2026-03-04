import mongoose from "mongoose";

const strategySchema = mongoose.Schema({
    strategyName : String
})

export default mongoose.model("Strategy",strategySchema)