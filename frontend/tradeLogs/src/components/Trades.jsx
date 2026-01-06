import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAxios } from "../customHooks/useAxiosRequests";
import Table from "react-bootstrap/Table";

const Trades = () => {
  const { result, loading, error, refetch } = useAxios(
    "get",
    "http://localhost:3000/api/fetchHistoryData"
  );
  console.log(result.data);
  //if (loading) return <div>...Loading</div>;
  //if (error) return <div>{error.message}</div>;
  return (
   <div style={{backgroundColor :"#f9fafb"}}>
      <Container className="border-0 shadow-sm rounded-4 p-4 my-5 bg-white">
      
        {
          error.message != null ? <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><h3>{error.message}</h3></div> : 
          loading ? <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><h3>...Loading</h3></div> :
          <Table responsive striped hover>
            <thead>
              <tr >
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
                result.data.map((ele,index) => ( 
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{new Date(ele.created_at).toLocaleDateString()}</td>
                      <td>{ele.contract_type}</td>
                      <td>{ele.product_symbol}</td>
                      <td>{ele.type}</td>
                      <td>{Number(ele.pnl).toFixed(2)}</td>
                      <td>{Number(ele.roe).toFixed(2)}</td>
                      <td>{ele.size}</td>
                      <td>{Number(ele.paid_commission).toFixed(2)}</td>
                      <td></td>
                    </tr>
                ))
              }
              {/* <tr>
                <td>1</td>
                {Array.from({ length: 12 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 12 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 12 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr> */}
            </tbody>
          </Table>
        }
      </Container>
    </div>
  )
};

export default Trades;
