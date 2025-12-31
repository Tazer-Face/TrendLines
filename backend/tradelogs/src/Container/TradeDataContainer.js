import GetAllHisDataService from "../Services/GetAllHisData.js";
import InsertHisData from "../Services/InsertHisData.js";
import GetJobHistory from "../Services/GetJobHis.js";
import MongoDbRepository from "../Repositories/MongoDbRepo.js";
import GetAllData from "../Controller/FetchHistoryDataApi.js";
import InsertExternalHisData from "../Controller/InsertHistoryDataApi.js";

const repo = new MongoDbRepository();

const getService = new GetAllHisDataService(repo);
export const insertService = new InsertHisData(repo);
export const getJobHis = new GetJobHistory(repo);


export const fetchController = new GetAllData({getService});
export const insertController = new InsertExternalHisData({insertService});
