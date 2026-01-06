import axios from "axios";
import { useEffect, useState } from "react";

function errorRes(res) {

    switch (res.response.status) {
      case 400:
        return "Bad request";
      case 401:
        return "Unauthorized - please login";
      case 403:
        return "Forbidden";
      case 404:
        return "Not found";
      case 500:
        return "Server error";
      default:
        return "Something went wrong";
    }

}
export const useAxios = (method,url, params={}) => {

  const [result , setResult] = useState({
          success : null,
          data : [],
          message : null
        });
  const [loading , setLoading] = useState(null);
  const [error , setError] = useState({
          success : null,
          data : null,
          message : null,
          errorCodeMessage : null
        });
  async function fetchData(){
    try{
        setLoading(true);
        const res = method === "get" ? await axios.get(url,params) : 
                    (
                      method === "post" ? await axios.post(url,params) : 
                      (method === "put" ? await axios.put(url,params) : await axios.delete(url,params)) 
                    )
         
        setResult({
          success : res.data.success,
          data : res.data.data,
          message : res.data.message
        });
        
    }
    catch(err){

        setLoading(false);

        if(err.response){
           setError({
            success : err.data.success,
            data : err.data.error,
            message : err.data.message,
            errorCodeMessage : errorRes(err)
          });    
        }
        else if(err.request){
            setError({
              message : "No response from server"
            }); 
            console.log("No response from server")
        }
        else{
            setError({
                message : err
              });
            console.log("Error : ",err);
        }
    }
    finally{
      setLoading(false);
    }
  }
    
  useEffect(()=>{
    fetchData();
  },[method,url])
  return {result,loading,error,refetch : fetchData}
};


