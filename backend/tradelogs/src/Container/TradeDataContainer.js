import GetAllHisDataService from "../Services/GetAllHisData.js";
import InsertHisData from "../Services/InsertHisData.js";
import GetJobHistory from "../Services/GetJobHis.js";
import AddStratergy from "../Services/AddStratergy.js";
import GetAllData from "../Controller/FetchHistoryDataApi.js";
import InsertExternalHisData from "../Controller/InsertHistoryDataApi.js";
import TradeHistory from "../External/DeltaApiRequests.js";
import { TradeHisJobs } from "../Jobs/TradeHisJobs.js";
import GetAllStratergies from "../Services/GetAllStratergies.js";
import FetchAllStrategies from "../Controller/FetchAllStrategiesApi.js";
import AddNewStrategy from "../Controller/AddNewStrategyApi.js";
import UpdateHisData from "../Services/UpdateHisData.js";
import UpdateHisDataApi from "../Controller/UpdateHisDataApi.js";
import MongoDbHisRepository from "../Repositories/MongoDb/MongoHistoricDataRepository.js";
import MongoDbStratRepository from "../Repositories/MongoDb/MongoStrategyRepository.js";
import DeleteStrategy from "../Services/DeleteStrategy.js";
import DeleteStrategyApi from "../Controller/DeleteStrategyApi.js";


// Repo
const HisRepo = new MongoDbHisRepository();
const StartRepo = new MongoDbStratRepository();

//External API
const tradeHis = new TradeHistory();

//Services
const getService = new GetAllHisDataService(HisRepo);
const getStrategyService = new GetAllStratergies(StartRepo);
const addStartegyService = new AddStratergy(StartRepo)
const updateHisDataService = new UpdateHisData(HisRepo)
const deleteStrategyService = new DeleteStrategy(HisRepo,StartRepo)

// Jobs services
export const insertService = new InsertHisData(HisRepo,tradeHis);
export const getJobHisService = new GetJobHistory(HisRepo,StartRepo);

//Scheduled Jobs
export const scheduledJobs = TradeHisJobs(insertService)

//Controller
export const fetchController = new GetAllData(getService);
export const insertController = new InsertExternalHisData(insertService);
export const fetchStratergiesController = new FetchAllStrategies(getStrategyService);
export const addStartergyController = new AddNewStrategy(addStartegyService);
export const updateHisDataController = new UpdateHisDataApi(updateHisDataService)
export const deleteStartegyController = new DeleteStrategyApi(deleteStrategyService);
