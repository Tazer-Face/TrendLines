import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    jobName: {
        type: String,
        default: "TradeHistoryJobs"
    },
    lastProcessedAt: String
})

export default mongoose.model('dataInsertionJobs', dataSchema);