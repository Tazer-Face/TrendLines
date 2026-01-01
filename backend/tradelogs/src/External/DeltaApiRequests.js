import axios from "axios";
import crypto from'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });
import ExternalAPIData from './IexternalAPI.js'


export default class TradeHistory extends ExternalAPIData{

    async tradeHistoryData(){

        function generateSignature(secret, timestamp, method, path) {
            const body = ""; 
            const message = `${method}${timestamp}${path}${body}`;
            return crypto.createHmac('sha256', secret).update(message).digest('hex');
        }

        const apiSecret = process.env.API_SECRET;

        if (!apiSecret) {
            console.error("Missing api_secret in environment");
            return;
        }

        try{
        
            const sigUrl = `${process.env.URL_PATH}?page_size=100`
            const method = "GET";
            const apiKey = process.env.API_KEY;
            const url = process.env.DELTA_URL;
            const allTrades = [];
            let totalCount,meta,pages=1;

            for ( let i = 0 ; i <  pages ; i++){
                const path = i === 0 ? sigUrl : `${sigUrl}&after=${meta}`;

                const timestamp = Math.floor(Date.now()/1000).toString();
                const signature = generateSignature(apiSecret, timestamp, method, path);

                const res = await axios.get(`${url}${path}`,{
                    headers: {
                        "api-key" : apiKey,
                        timestamp: timestamp,
                        signature: signature,
                        Accept: 'application/json'
                    }
                })
                allTrades.push(...res.data.result);
                
                meta = res.data.meta.after;

                if (!meta) break;

                if(i===0){
                    totalCount = res.data.meta.total_count;
                    pages = Math.ceil(totalCount/100);
                }
            }

            return allTrades;
        }
        catch(err){
            console.error("Error fetching data: ", err.response ? err.response.data : err.message);
            return;
        }
    }
       
}
