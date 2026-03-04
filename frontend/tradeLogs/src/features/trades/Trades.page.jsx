import React, { useCallback, useEffect, useMemo } from "react";
import { Button, Container } from "react-bootstrap";
import { useTradesHooks } from "./Trades.hooks";
import TradesFiltersForm from "./TradesFiltersForm";
import TradesTable from "./TradesTable";
import { filteredData } from "./Trades.utils";
import { useFetchUpdateStrategies } from "../../shared/hooks/useFetchUpdateStrategies";

const Trades = () => {
  const { visible, apply , symbols , filters , open, clear, rows, loading, error, refetch , close } = useTradesHooks();
  const { refetchCategories} = useFetchUpdateStrategies();

  const CurfilteredData = useMemo(()=>{
    
    const data = filteredData(rows,filters);
    const stats = data?.reduce((sum,t)=>{
      sum.totalPL += Number(t.pnl);

      if (t.pnl > 0) sum.profit += Number(t.pnl);
      if (t.pnl < 0) sum.loss += Number(t.pnl);

      return sum;

    },{profit : 0 , loss : 0 , totalPL : 0});

    return {data,...stats}
  },[rows,filters])

  const refresh = useCallback(()=>{
    refetch();
  },[refetch])

  console.log(rows)

  return (
    <div style={{ backgroundColor: "#f9fafb" }}>
      <Container>
        {visible ? (
          <div className="d-flex align-items-center justify-content-center">
            <TradesFiltersForm
              symbols = {symbols}
              clear = {clear}
              apply = {apply}
              filters = {filters}
              close = {close}
            />
          </div>

        ) :
        <div className="border-0 shadow-sm rounded-4 p-4 mb-3 mt-5 bg-white">
          <div  className="table-scroll">
            { (error?.message) ? (
              <div className="d-flex justify-content-center align-items-center">
                <h3>{error.message}</h3>
              </div>
            ) : loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <h3>...Loading</h3>
              </div>
            ) : (
              <TradesTable
                rows={CurfilteredData.data}
                refresh = {refresh}
              />
            )}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-start align-items-md-center gap-3">
            <h5 className="mt-4 border-0 shadow-sm rounded-4 p-3">Total records : {CurfilteredData.data?.length}</h5>
            <h5 className="mt-4 text-success border-0 shadow-sm rounded-4 p-3"><span className="text-black">Profit : $</span> {(CurfilteredData.profit).toFixed(2)}</h5>
            <h5 className="mt-4 text-danger border-0 shadow-sm rounded-4 p-3"><span className="text-black">Loss : $</span>{(CurfilteredData.loss).toFixed(2)}</h5>
            <h5 className={`mt-4 border-0 shadow-sm rounded-4 p-3
                  ${CurfilteredData.totalPL > 0 ? "text-success" : (CurfilteredData.totalPL < 0 ? "text-danger" : "text-black")}
                  `}
            ><span className="text-black">Total P/L : $ </span>{(CurfilteredData.totalPL).toFixed(2)}
            </h5>
          </div>
        </div>
        }
        <div className="mt-1 mb-5 mb-0">
          <div className="d-flex flex-column align-items-center justify-content-center flex-sm-row align-items-center justify-content-sm-center justify-content-md-start gap-3">
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={open}
            >
              Filters
            </Button>
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={clear}
            >
              Clear Filters
            </Button>
            <Button onClick={()=>{refetch();refetchCategories();}}
              className="border-0 shadow-sm rounded-4 p-3"
            >
              Refresh
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Trades;
