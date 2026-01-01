import cron from 'node-cron';

export function TradeHisJobs(getJobHis,insertService){

    const runNow = async ()=>{
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

    const scheduleDataInsertion = ()=>{
        cron.schedule("*/30 * * * *", 
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

    return {runNow,scheduleDataInsertion}
}