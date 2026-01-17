import GetAllHisDataService from "../Services/GetAllHisData.js";
import InsertHisData from "../Services/InsertHisData.js";
import GetJobHistory from "../Services/GetJobHis.js";
import AddStratergy from "../Services/AddStratergy.js";
import MongoDbRepository from "../Repositories/MongoDbRepo.js";
import GetAllData from "../Controller/FetchHistoryDataApi.js";
import InsertExternalHisData from "../Controller/InsertHistoryDataApi.js";
import TradeHistory from "../External/DeltaApiRequests.js";
import { TradeHisJobs } from "../Jobs/TradeHisJobs.js";
import GetAllStratergies from "../Services/GetAllStratergies.js";
import FetchAllStratergies from "../Controller/FetchAllStratergiesApi.js";
import AddNewStratergy from "../Controller/AddNewStratergyApi.js";
import UpdateHisData from "../Services/UpdateHisData.js";
import UpdateHisDataApi from "../Controller/UpdateHisDataApi.js";


// Repo
const repo = new MongoDbRepository();

//External API
const tradeHis = new TradeHistory();

//Services
const getService = new GetAllHisDataService(repo);
const getStratergyService = new GetAllStratergies(repo);
const addStartergyService = new AddStratergy(repo)
const updateHisDataService = new UpdateHisData(repo)
export const insertService = new InsertHisData(repo,tradeHis);
export const getJobHisService = new GetJobHistory(repo);

//Scheduled Jobs
export const scheduledJobs = TradeHisJobs(insertService)

//Controller
export const fetchController = new GetAllData(getService);
export const insertController = new InsertExternalHisData(insertService);
export const fetchStratergiesController = new FetchAllStratergies(getStratergyService);
export const addStartergyController = new AddNewStratergy(addStartergyService);
export const updateHisDataController = new UpdateHisDataApi(updateHisDataService)
