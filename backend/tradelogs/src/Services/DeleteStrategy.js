import mongoose from "mongoose"

class DeleteStrategy{
    constructor(HistoricDataRepo,StrategyDataRepo){
        this.HistoricDataRepo = HistoricDataRepo
        this.StrategyDataRepo = StrategyDataRepo
    }

    async deleteStrategy(data){

        const session = await mongoose.startSession()

        try{
            await session.withTransaction(async ()=>{

                await this.HistoricDataRepo.updateHisData(data,session)
                console.log(data);
                const deleted = await this.StrategyDataRepo.deleteStrategy(data,session)
                console.log(deleted)

                if(deleted === 0){
                    throw new Error("Strategy not found");
                }

            })
        }
        finally{
            session.endSession();
        }
    }
}

export default DeleteStrategy