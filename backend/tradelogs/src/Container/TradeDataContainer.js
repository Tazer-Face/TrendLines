import GetAllHisDataService from "../Services/GetAllHisData.js";
import InsertHisData from "../Services/InsertHisData.js";
import GetJobHistory from "../Services/GetJobHis.js";
import MongoDbRepository from "../Repositories/MongoDbRepo.js";
import GetAllData from "../Controller/FetchHistoryDataApi.js";
import InsertExternalHisData from "../Controller/InsertHistoryDataApi.js";
import TradeHistory from "../External/DeltaApiRequests.js";

const repo = new MongoDbRepository();
const tradeHis = new TradeHistory();

const getService = new GetAllHisDataService(repo);
export const insertService = new InsertHisData(repo,tradeHis);
export const getJobHis = new GetJobHistory(repo);


export const fetchController = new GetAllData({getService});
export const insertController = new InsertExternalHisData({insertService});
