import { useContext, useState } from "react"
import { useAxiosMutation } from "../../shared/hooks/useAxiosRequestsMutation";

export const useStrategiesHooks = ()=>{

    const  {update : AddStrategy} =  useAxiosMutation("post","http://localhost:3000/api/addStrategiesData");

    return{
        addStrategyData : AddStrategy
    }
}