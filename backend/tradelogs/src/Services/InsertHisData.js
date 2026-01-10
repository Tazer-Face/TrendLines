class InsertHisData {
    constructor(userRepo,externalApiData){
        this.userRepo = userRepo;
        this.externalApiData = externalApiData;
    }

    async addHisData(){
        const res =await this.externalApiData.tradeHistoryData();
        if (!res || res.length === 0) return;
        const jobRes = await this.userRepo.getJobsHis();
        const lastProcessedAt = jobRes && jobRes.length > 0 ? jobRes[0].lastProcessedAt : null;
        const data = res
                .filter( trade => 
                    trade.state === "closed" &&
                    trade.meta_data &&
                    trade.meta_data.entry_price != null &&
                    trade.meta_data.avg_exit_price != null &&
                    trade.meta_data.pnl != null &&
                    trade.product.contract_type === "perpetual_futures" &&
                    trade.size != null && ( !lastProcessedAt || trade.created_at > lastProcessedAt))
                .sort( (a,b) => new Date(b.created_at) - new Date(a.created_at) )
                .map( trade =>{
                    return {
                        product_symbol: trade.product_symbol,
                        state: trade.state,
                        id: trade.id,
                        created_at: trade.created_at,
                        stop_order_type: trade.stop_order_type,
                        contract_type: (trade.product.contract_type)?.replaceAll("_", " "),
                        entry_price : trade.meta_data.entry_price,
                        exit_price : trade.meta_data.avg_exit_price,
                        pnl :  trade.meta_data.pnl ,
                        roe: trade.meta_data.roe,
                        paid_commission : trade.paid_commission,
                        size: trade.size,
                        type : trade.side === "buy" ? "Short" : "Long" 
                    }
                })

        if (data.length === 0) return{"data":0};
        await this.userRepo.addHisData(data);
        await this.userRepo.addJobsHis(data[0].created_at);          
      
    }
}

export default InsertHisData;