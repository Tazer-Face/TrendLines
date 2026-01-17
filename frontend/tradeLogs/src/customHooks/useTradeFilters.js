import { useState } from "react"

export const useTradesFilters = () => {
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
        }
    }
}