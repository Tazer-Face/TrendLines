import { useContext, useState } from "react"
import { TradesDataContext } from "../../app/providers/TradesDataContext";
import { useAxiosMutation } from "./useAxiosRequestsMutation";

export const useFetchUpdateStrategies = ()=>{

    const  {loading : updateStratloading , update : updateStrategy} =  useAxiosMutation("put","http://localhost:3000/api/updateHistoryData");

    const {categoriesResult,categoriesLoading,categoriesError,refetchCategories} = useContext(TradesDataContext)
    return{

        categories : (categoriesResult.data && categoriesResult.data.length > 0 ) ? categoriesResult.data : [], 
        categoriesLoading,
        categoriesError,
        refetchCategories,
        updateStrategyData : updateStrategy,
        updateStratloading
    }
}