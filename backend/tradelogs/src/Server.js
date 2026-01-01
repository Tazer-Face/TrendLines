import routes from './Routes/TradingLogsRoutes.js';
import express from 'express';
const app = express();
import {connect, disconnect} from './Config/MongoDbConnections.js';
import {scheduledJobs} from './Container/TradeDataContainer.js'

import dotenv from 'dotenv';
dotenv.config()

connect();

scheduledJobs.runNow();
scheduledJobs.scheduleDataInsertion();

app.use(express.json());
app.use('/api', routes);

process.on('SIGINT', async () => {
    await disconnect();
});
process.on('SIGTERM', async () => {
    await disconnect();
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})