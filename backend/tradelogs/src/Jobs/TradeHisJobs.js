import cron from 'node-cron';

export function TradeHisJobs(insertService){

    const runNow = async ()=>{
            
                try{
                    let res = await insertService.addHisData();

                    if ( res && res.data === 0){
                        console.log("No new data to insert")
                    }
                    else{
                        console.log("Data insertion completed.");
                    }
                }
                catch(err){
                    console.error("Error during initial data insertion: ", err);
                }
            
    }

    const scheduleDataInsertion = ()=>{
        cron.schedule("*/1 * * * *", 
            async () =>{
                try{
                    let res = await insertService.addHisData();
                    if ( res && res.data === 0){
                        console.log("No new data to insert")
                    }
                    else{
                        console.log("New data inserted successfully.");
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