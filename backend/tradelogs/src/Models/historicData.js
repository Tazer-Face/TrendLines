import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    product_symbol: String,
    state: String,
    id: Number,
    created_at: String,
    stop_order_type: String,
    contract_type: String,
    entry_price : String,
    exit_price : String,
    pnl : String,
    roe: String,
    paid_commission : String,
    size: Number,
    type : String
})

export default mongoose.model('HistoricData', dataSchema);