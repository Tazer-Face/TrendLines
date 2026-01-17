import React, { useEffect, useState } from 'react'
import { TradesDataContext } from './TradesDataContext';
import { useAxiosQuery } from '../customHooks/useAxiosRequestsQuery.js';

const TradesDataProvider = ({children}) => {

    const  { result, loading, error, refetch } = useAxiosQuery(
    "http://localhost:3000/api/fetchHistoryData"
    );


    const {
        result: categoriesResult,
        loading: categoriesLoading,
        error: categoriesError,
        refetch: refetchCategories
    } = useAxiosQuery(
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