import { useContext } from "react";
import { useAxios } from "./useAxiosRequests";
import { TradesDataContext } from "../Context/TradesDataContext";

export const useTradesData = ()=>{



    const {result, loading, error, refetch} = useContext(TradesDataContext);

    
    const rows = (result.data && result.data.length > 0 ) ? result.data : [];

    const symbols = [...new Set(rows.map(ele => ele.product_symbol))]

    return {rows,symbols, loading, error, refetch}
}