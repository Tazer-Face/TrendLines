import GetAllHisDataService from "../Services/GetAllHisData.js";
import InsertHisData from "../Services/InsertHisData.js";
import GetJobHistory from "../Services/GetJobHis.js";
import MongoDbRepository from "../Repositories/MongoDbRepo.js";
import GetAllData from "../Controller/FetchHistoryDataApi.js";
import InsertExternalHisData from "../Controller/InsertHistoryDataApi.js";
import TradeHistory from "../External/DeltaApiRequests.js";
import { TradeHisJobs } from "../Jobs/TradeHisJobs.js";

// Repo
const repo = new MongoDbRepository();

//External API
const tradeHis = new TradeHistory();

//Services
const getService = new GetAllHisDataService(repo);
export const insertService = new InsertHisData(repo,tradeHis);
export const getJobHisService = new GetJobHistory(repo);

//Scheduled Jobs
export const scheduledJobs = TradeHisJobs(getJobHisService,insertService)

//Controller
export const fetchController = new GetAllData(getService);
export const insertController = new InsertExternalHisData(insertService);
