import { insertService } from '../Container/TradeDataContainer.js';
import cron from 'node-cron';
import { getJobHis } from '../Container/TradeDataContainer.js';

export const runNow = async ()=>{
        const jobRes = await getJobHis.JobsHis();
        const lastProcessedAt = jobRes && jobRes.length > 0 ? jobRes[0].lastProcessedAt : null;
        if (!lastProcessedAt){
            try{
                let res = await insertService.addHisData();
                if ( res && res.data === 0){
                    console.log("Data already exists")
                }
                else{
                    console.log("Data insertion completed.");
                }
            }
            catch(err){
                console.error("Error during initial data insertion: ", err);
            }
        }
        else{
            return;
        }
        
}


export const scheduleDataInsertion = ()=>{
    cron.schedule("*/1 * * * *", 
        async () =>{
            try{
                let res = await insertService.addHisData();
                if ( res && res.data === 0){
                    console.log("No new data to insert")
                }
                else{
                    console.log("Data insertion completed.");
                }
            }catch(err){
                console.error("Error during scheduled data insertion: ", err);
            }      
              
        },
        {
        scheduled: true,
        timezone: "UTC"
        }
    );
}
