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

      return {
        success: true,
        data: res.data.data ?? null,
        message: res.data.message ?? null,
        error: null
      };

    } catch (err) {
  
      if (err.response) {
        // Server responded (404, 500, etc.)
        return {
          success: false,
          data: err.response.data?.data ?? null,
          message: err.response.data?.message ?? "Request failed",
          errorCodeMessage: errorRes(err)
        };
      }

      if (err.request) {
        // No response
        return {
          success: false,
          data: null,
          message: "No response from server",
          errorCodeMessage: null
        };
      }

       return {
        success: false,
        data: null,
        message: err.message,
        errorCodeMessage: null
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    update: fetchData,
  };
};