import express from 'express';
const Router = express.Router();
import {fetchController} from '../Container/TradeDataContainer.js';

Router.get('/fetchHistoryData', fetchController.getAllData.bind(fetchController));

export default Router;