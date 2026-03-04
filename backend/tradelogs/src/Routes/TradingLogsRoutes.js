import express from 'express';
const Router = express.Router();
import {fetchController,fetchStratergiesController,addStartergyController,updateHisDataController, deleteStartegyController} from '../Container/TradeDataContainer.js';

Router.get('/fetchHistoryData', fetchController.getAllData.bind(fetchController));
Router.get('/fetchStratergiesData', fetchStratergiesController.getAllStratergies.bind(fetchStratergiesController));
Router.post('/addStrategiesData', addStartergyController.addStratergy.bind(addStartergyController));
Router.put('/updateHistoryData', updateHisDataController.updateHisData.bind(updateHisDataController));
Router.delete('/deleteStrategiesData', deleteStartegyController.deleteStrategy.bind(deleteStartegyController));


export default Router;