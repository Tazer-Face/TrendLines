import DataInsertionTS from "../../Models/DataInsertionTS.js";
import HistoricDataAbstraction from "../Abstractions/HistoricDataRepository.js";
import HistoricData from "../../Models/historicData.js";

class MongoDbHisRepository extends HistoricDataAbstraction {
    async getAllData(){
        try{
            const res = await HistoricData.find({}).sort({ created_at: -1 }).lean();;
            return res;
        }
        catch(error){
            console.error("Error fetching historic data: ", error);
            throw error;
        }

    }
    async addHisData(data){
        try{
            await HistoricData.insertMany(data);
            console.log("Historic data inserted successfully.");
        } catch(error) {
            console.error("Error inserting historic data: ", error);
            throw error;
        }
    }

    async updateHisData(data,session=undefined){
        try{
            await HistoricData.updateOne({_id : data._id},{ $set: { strategy: data.strategy } },session ? {session} : undefined);
            console.log("History data updated successfully.");
        } catch(error) {
            console.error("Error updating History data: ", error);
            throw error;
        }
    }

    async getJobsHis(){
        try{
            const res = await DataInsertionTS.find({}).lean();
            return res;
        }
        catch(error){
            console.error("Error fetching historic data: ", error);
            throw error;
        }
    }

    async addJobsHis(data){
        try{
            await DataInsertionTS.updateOne({jobName : "TradeHistoryJobs"},{ $set: { lastProcessedAt: data } },{ upsert: true });
            console.log("Jobs data updated successfully.");
        } catch(error) {
            console.error("Error updating jobs data: ", error);
            throw error
        }
    }
}

export default MongoDbHisRepository;