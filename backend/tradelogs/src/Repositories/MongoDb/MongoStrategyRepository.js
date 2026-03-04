import Strategy from "../../Models/Strategies.js";
import StrategyDataAbstraction from "../Abstractions/StrategyRepository.js";

class MongoDbStratRepository extends StrategyDataAbstraction {
    
    async getAllStratergies(){
        try{
            const res = await Strategy.find({}).lean();
            return res;
        } catch(error) {
            console.error("Error fetching all strategies: ", error);
            throw error;
        }
    }
    async addStratergy(data){
        try{
            await Strategy.insertMany({strategyName : data});
            console.log("Inserted new strategy.");
        } catch(error) {
            console.error("Error inserting new strategy: ", error);
            throw error;
        }
    }
    async deleteStrategy(data,session=undefined){
        try{
            let result = await Strategy.deleteMany({_id : data.strategyId},session ? {session} : undefined);
            console.log("Stratergy deleted successfully.");
            return result.deletedCount ;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
}

export default MongoDbStratRepository;