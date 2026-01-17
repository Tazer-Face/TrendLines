function convertToDate(date){
const [month,day,year] = date.split("/");
return new Date(year,month -1,day)
}

export const filteredData = (rows,filter)=>{
    if (!rows) return [];
    let fromDateC = filter.fromDate !== "" ? convertToDate(filter.fromDate) : null;
    let toDateC = filter.toDate !=="" ? convertToDate(filter.toDate) : null;

    return rows.filter(ele => {
        let curDate = new Date(ele.created_at);
        return (
            (  (!fromDateC || curDate >= fromDateC) && (!toDateC || curDate <= toDateC) ) &&
            (  filter.contract !== "" ? filter.contract === ele.contract_type : true) &&
            (  filter.symbol !== "" ? filter.symbol === ele.product_symbol : true ) &&
            (  filter.longShort !== "" ?  filter.longShort === ele.type : true) &&
            (  filter.pL  !== "" ? (filter.pL === "Profit" ? Number(ele.pnl) > 0 : (filter.pL === "Loss" ? Number(ele.pnl) < 0 : Number(ele.pnl) === 0 )) : true )
        )
    })
}