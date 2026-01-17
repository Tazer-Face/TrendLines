import UserRepository from "./IUserRepo.js";
import HistoricData from "../Models/historicData.js";
import DataInsertionTS from "../Models/DataInsertionTS.js";
import Stratergy from "../Models/Stratergies.js";

class MongoDbRepository extends UserRepository {
    async getAllData(){
        try{
            const res = await HistoricData.find({}).sort({ created_at: -1 }).lean();;
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

    async updateHisData(data){
        try{
            await HistoricData.updateOne({_id : data._id},{ $set: { stratergy: data.stratergy } });
            console.log("History data updated successfully.");
        } catch(error) {
            console.error("Error updating History data: ", error);
        }
    }

    async getJobsHis(){
        try{
            const res = await DataInsertionTS.find({}).lean();
            return res;
        }
        catch(error){
            console.error("Error fetching historic data: ", error);
        }
    }

    async addJobsHis(data){
        try{
            await DataInsertionTS.updateOne({jobName : "TradeHistoryJobs"},{ $set: { lastProcessedAt: data } },{ upsert: true });
            console.log("Jobs data updated successfully.");
        } catch(error) {
            console.error("Error updating jobs data: ", error);
        }
    }
    async getAllStratergies(){
        try{
            const res = await Stratergy.find({}).lean();
            return res;
        } catch(error) {
            console.error("Error fetching all stratergies: ", error);
        }
    }
    async addStratergy(data){
        try{
            await Stratergy.insertMany({stratergyName : data});
            console.log("Inserted new stratergy.");
        } catch(error) {
            console.error("Error inserting new stratergy: ", error);
        }
    }
}

export default MongoDbRepository;