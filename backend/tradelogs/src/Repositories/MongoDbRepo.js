import UserRepository from "./IUserRepo.js";
import HistoricData from "../Models/historicData.js";
import DataInsertionTS from "../Models/DataInsertionTS.js";

class MongoDbRepository extends UserRepository {
    async getAllData(){
        try{
            const res = await HistoricData.find({}).sort({ created_at: -1 });;
            return res;
        }
        catch(error){
            console.error("Error fetching historic data: ", error);
        }

    }
    async addHisData(data){
        try{
            await HistoricData.insertMany(data);
            console.log("Historic data inserted successfully.");
        } catch(error) {
            console.error("Error inserting historic data: ", error);
        }
    }

    async getJobsHis(){
        try{
            const res = await DataInsertionTS.find({});
            return res;
        }
        catch(error){
            console.error("Error fetching historic data: ", error);
        }
    }

    async addJobsHis(data){
        try{
            await DataInsertionTS.updateOne({jobName : "TradeHistoryJobs"},{ $set: { lastProcessedAt: data } });
            console.log("Jobs data updated successfully.");
        } catch(error) {
            console.error("Error updating jobs data: ", error);
        }
    }
}

export default MongoDbRepository;