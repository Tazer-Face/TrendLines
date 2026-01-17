import mongoose from "mongoose";

const stratergySchema = mongoose.Schema({
    stratergyName : String
})

export default mongoose.model("Stratergy",stratergySchema)