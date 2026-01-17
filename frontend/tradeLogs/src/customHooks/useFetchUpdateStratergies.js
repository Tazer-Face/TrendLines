import { useContext, useState } from "react"
import { TradesDataContext } from "../Context/TradesDataContext";
import { useAxiosMutation } from "./useAxiosRequestsMutation";

export const useFetchUpdateStratergies = ()=>{

        const  {loading : updateStratloading , update : updateStratergy} =  useAxiosMutation("put","http://localhost:3000/api/updateHistoryData");

        const  {loading : AddStratloading, update : AddStratergy} =  useAxiosMutation("post","http://localhost:3000/api/addStratergiesData");

    const {categoriesResult,categoriesLoading,categoriesError,refetchCategories} = useContext(TradesDataContext)
    return{

        categories : (categoriesResult.data && categoriesResult.data.length > 0 ) ? categoriesResult.data : [], 
        categoriesLoading,
        categoriesError,
        refetchCategories,
        updateStratergyData : updateStratergy,
        updateStratloading,
        addStratergyData : AddStratergy,
        AddStratloading
    }
}