import axios from "axios";
import { useState } from "react";

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

export const useAxiosMutation = (method, url) => {

  const [loading, setLoading] = useState(null);

  async function fetchData(params = {}) {
    try {
      setLoading(true);

      const res =
        method === "post"
          ? await axios.post(url, params)
          : method === "put"
          ? await axios.put(url, params)
          : await axios.delete(url, params);

      const {success,data,message,error} = res?.data?.success ? {...res?.data,error :{message : null}} : {};


      return {success,data,message,error}
    } catch (err) {
  
      const {errSuccess,errData,errMessage,errorCodeMessage} = !err?.response.data.success ? {...(err?.response.data),errorCodeMessage : errorRes(err) }:
                                                      err.request ? {errSuccess : false , errData : err.request,errMessage : "No response from server" } :
                                                      err?.response.data


      return {errSuccess,errData,errMessage,errorCodeMessage}
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    update: fetchData,
  };
};