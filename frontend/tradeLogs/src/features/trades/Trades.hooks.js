import { useContext, useMemo, useState } from "react"
import TradesDataProvider from "../../app/providers/TradesDataProvider";
import { TradesDataContext } from "../../app/providers/TradesDataContext";

export const useTradesHooks = () => {
    // Filter hooks
    const [visible,setVisible] = useState(false);
    const [filters,setFilter] = useState({
        fromDate: "",
        toDate: "",
        contract: "",
        symbol: "",
        longShort: "",
        pL: ""
    });

    const clearData = {
        fromDate: "",
        toDate: "",
        contract: "",
        symbol: "",
        longShort: "",
        pL: ""
    }

    // Data hooks
    const {result, loading, error, refetch} = useContext(TradesDataContext);
       
    const rows = (result.data && result.data.length > 0 ) ? result.data : [];

    const symbols =useMemo(() => [...new Set(rows.map(ele => ele.product_symbol))],[rows]) 

    return {
            visible,
            filters,
            clearData,
            open : () => setVisible(true),
            close : () => setVisible(false),
            clear : () => setFilter(clearData),
            apply : (values) => {
                setFilter(values);
                setVisible(false);
            },
            rows,
            symbols,
            loading,
            error,
            refetch
    }
}