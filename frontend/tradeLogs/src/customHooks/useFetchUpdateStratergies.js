import { useContext, useState } from "react"
import { TradesDataContext } from "../Context/TradesDataContext";
import { useAxios } from "./useAxiosRequests";

export const useFetchUpdateStratergies = ()=>{

    const createStratergyData = (data)=>{
        const  { result: newCategoriesResult,
        loading: newCategoriesLoading,
        error: newCategoriesError } =  useAxios("post","http://localhost:3000/api/fetchStratergiesData",{stratergyName : data});
        return {newCategoriesResult,newCategoriesLoading,newCategoriesError}
    }
    
    const [stratVisible , setStratVisible] = useState(false);
    // const [stratData , setStratData] = useState([]);
    const {categoriesResult,categoriesLoading,categoriesError,refetchCategories} = useContext(TradesDataContext)
    return{
        openStrat : ()=>setStratVisible(true),
        closeStrat : ()=>setStratVisible(false),
        categories : (categoriesResult.data && categoriesResult.data.length > 0 ) ? categoriesResult.data : [], 
        stratVisible,
        categoriesLoading,
        categoriesError,
        refetchCategories,
        createStratergyData
    }
}