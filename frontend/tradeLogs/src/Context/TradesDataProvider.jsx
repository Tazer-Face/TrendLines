import React, { useEffect, useState } from 'react'
import { TradesDataContext } from './TradesDataContext';
import { useAxios } from '../customHooks/useAxiosRequests';

const TradesDataProvider = ({children}) => {

    const  { result, loading, error, refetch } = useAxios(
    "get",
    "http://localhost:3000/api/fetchHistoryData"
    );


    const {
        result: categoriesResult,
        loading: categoriesLoading,
        error: categoriesError,
        refetch: refetchCategories
    } = useAxios(
    "get",
    "http://localhost:3000/api/fetchStratergiesData"
    );

    

  return (
    <TradesDataContext.Provider
      value={{result,loading,error,refetch,categoriesResult,categoriesLoading,categoriesError,refetchCategories}}
    >
        {children}
    </TradesDataContext.Provider>
    
  )
}

export default TradesDataProvider