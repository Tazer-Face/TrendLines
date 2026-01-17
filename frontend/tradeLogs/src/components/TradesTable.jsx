import React from 'react'
import Table from "react-bootstrap/Table";
import StratergyCell from './StratergyCell';
import { useFetchUpdateStratergies } from '../customHooks/useFetchUpdateStratergies';

const TradesTable = React.memo(function TradesTable({ rows }){
  const {stratVisible,
          categoriesLoading,
          categoriesError,
          refetchCategories,
          createStratergyData,
          openStrat,
          closeStrat,
          categories} = useFetchUpdateStratergies()
  return (
    <Table hover>
                <thead style={{ position: "sticky", top: 0}}>
                  <tr>
                    <th></th>
                    <th>Order placed on</th>
                    <th>Contract type</th>
                    <th>Symbol</th>
                    <th>Long/Short</th>
                    <th>P/L</th>
                    <th>ROE</th>
                    <th>Size</th>
                    <th>Comission</th>
                    <th>Stratergy</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  
                  (rows)?.map((ele, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(ele.created_at).toLocaleDateString()}</td>
                      <td>{ele.contract_type}</td>
                      <td>{ele.product_symbol}</td>
                      <td>{ele.type}</td>
                      <td
                        className={
                          Number(ele.pnl) > 0 ? "text-success" : (Number(ele.pnl) < 0 ? "text-danger" : "text-black")
                        }
                      >
                        {Number(ele.pnl).toFixed(2) >= 0
                          ? `+${Number(ele.pnl).toFixed(2)}`
                          : Number(ele.pnl).toFixed(2)}
                      </td>
                      <td
                        className={
                          Number(ele.roe) > 0 ? "text-success" : (Number(ele.roe) < 0 ? "text-danger" : "text-black")
                        }
                      >
                        {Number(ele.roe).toFixed(2) >= 0
                          ? `+${Number(ele.roe).toFixed(2)}`
                          : Number(ele.roe).toFixed(2)}
                      </td>
                      <td>{ele.size}</td>
                      <td>{Number(ele.paid_commission).toFixed(2)}</td>
                      <td onDoubleClick={()=>{openStrat()}}>
                        { stratVisible ?
                          <StratergyCell 
                          id={ele._id} 
                          value={ele.stratergy}
                          closeStrat = {closeStrat}
                          categories = {categories}
                          stratVisible = {stratVisible}
                           /> :
                           <td>{ele.stratergy}</td>
                        }
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
  )
})

export default TradesTable