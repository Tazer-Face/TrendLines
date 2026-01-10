import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAxios } from "../customHooks/useAxiosRequests";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Trades = () => {
  const [symbol, setSymbol] = useState([]);
  const [filter, setFilter] = useState({
    visible: false,
    fromDate: "",
    toDate: "",
    contract: "",
    symbol: "",
    longShort: "",
    pL: "",
  });

  const [dataRender,setData] = useState([])
  
  const  { result, loading, error, refetch } = useAxios(
    "get",
    "http://localhost:3000/api/fetchHistoryData"
  );

  function convertToDate(date){
    const [month,day,year] = date.split("/");
    return new Date(year,month -1,day)
  }

  function handleChange(e){
    const {name,value} = e.target;
    setFilter(prev =>({
      ...prev,[name] : value
    }))
  }

  function handleSubmit(e){
    e.preventDefault();
    //console.log(filter)

    

    let fromDateC = filter.fromDate !== "" ? convertToDate(filter.fromDate) : null;
    let toDateC = filter.toDate !=="" ? convertToDate(filter.toDate) : null

    let renderData =  [...result?.data.filter(ele => 
      (  (!fromDateC || new Date(ele.created_at) >= fromDateC) && (!toDateC || new Date(ele.created_at) <= toDateC) ) &&
      (  filter.contract !== "" ? filter.contract === ele.contract_type : true) &&
      (  filter.symbol !== "" ? filter.symbol === ele.product_symbol : true ) &&
      (  filter.longShort !== "" ?  filter.longShort === ele.type : true) &&
      (  filter.pL  !== "" ? (filter.pL === "Profit" ? Number(ele.pnl) > 0 : (filter.pL === "Loss" ? Number(ele.pnl) < 0 : Number(ele.pnl) === 0 )) : true )
    )]
    console.log(renderData.length);
    renderData?.length > 0 ? setData(renderData) : setData(result.data)
    console.log(dataRender);
    closeForm();
  }

  function refresh(){
    refetch();
  }

  function openForm(){
    clearForm();
    setFilter(prev => ({
      ...prev,visible : true
    }))
  }

  function closeForm(){
    setFilter(prev => ({
      ...prev,visible : false
    }))
  }

  function clearForm(){
    setFilter(prev => ({
    ...prev, 
    visible: true,
    fromDate: "",
    toDate: "",
    contract: "",
    symbol: "",
    longShort: "",
    pL: ""
    }))
  }

  useEffect(() => {
    if (result.data) {
      let data = [...new Set(result.data.map((res) => res.product_symbol))];
      setSymbol(data);
      setData(result.data);
    }
    //console.log(result.data);
    //console.log(dataRender.data);
    
  }, [result]);

  return (
    <div style={{ backgroundColor: "#f9fafb" }}>
      <Container>
        <div className="border-0 shadow-sm rounded-4 p-4 mt-3">
          <h4>Filters</h4>
          <div className="d-flex flex-column justify-content-center align-items-start flex-md-row justify-content-md-start align-items-md-center gap-3">
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={openForm}
            >
              DATE
            </Button>
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={openForm}
            >
              CONTRACT
            </Button>
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={openForm}
            >
              SYMBOL
            </Button>
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={openForm}
            >
              LONG/SHORT
            </Button>
            <Button
              className="border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: "#f9fafb", color: "black" }}
              onClick={openForm}
            >
              P/L
            </Button>
            {/* <Button className="border-0 shadow-sm rounded-4 p-3">CLEAR</Button>
            <Button className="border-0 shadow-sm rounded-4 p-3">SEARCH</Button> */}
          </div>
        </div>
        <div className="border-0 shadow-sm rounded-4 p-4 my-5 bg-white">
          <div style={{ maxHeight: "53dvh", overflowY: "auto" }}>
            {error.message != null ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <h3>{error.message}</h3>
              </div>
            ) : loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100dvh" }}
              >
                <h3>...Loading</h3>
              </div>
            ) : (
              <Table hover>
                <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
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
                  
                  (dataRender)?.map((ele, index) => (
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
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          <h5 className="mt-4">Total records : {dataRender.length}</h5>
        </div>
        <div className="container d-flex align-items-center justify-content-center  justify-content-md-end mb-4">
          <Button onClick={refresh}>REFRESH</Button>
        </div>
        { filter.visible &&
          <div className="d-flex z-5 w-100 h-100 align-items-center justify-content-center">
            <Form
              className=" d-flex flex-column justify-content-center align-items-center  w-25 border-0 shadow-sm rounded-4 p-4 my-5 bg-white"
              onSubmit={handleSubmit}
            >
              <Form.Group
                className="mt-2"
                as={Col}
                md="10"
                controlId="fromDate"
              >
                <Form.Label>From date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mm/dd/yyyy"
                  name="fromDate"
                  value={filter.fromDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mt-4"
                as={Col}
                md="10"
                controlId="toDate"
              >
                <Form.Label>To date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mm/dd/yyyy"
                  name="toDate"
                  value={filter.toDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mt-4"
                as={Col}
                md="10"
                controlId="contract"
              >
                <Form.Label>Contract</Form.Label>
                <Form.Select 
                  name="contract"
                  value={filter.contract}
                  onChange={handleChange}
                >
                  <option>perpetual futures</option>
                  <option>options</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mt-4"
                as={Col}
                md="10"
                controlId="symbol"
              >
                <Form.Label>Symbol</Form.Label>
                <Form.Select
                  name="symbol"
                  value={filter.symbol}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {symbol.map((res,key) => ( 
                    <option  value={res} key={key}>{res}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mt-4"
                as={Col}
                md="10"
                controlId="longShort"
              >
                <Form.Label>Long/Short</Form.Label>
                <Form.Select
                  name="longShort"
                  value={filter.longShort}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mt-4"
                as={Col}
                md="10"
                controlId="validationCustom01"
              >
                <Form.Label>P/L</Form.Label>
                <Form.Select
                  name="pL"
                  value={filter.pL}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Profit">Profit</option>
                  <option value="Loss">Loss</option>
                  <option value="Break even">Break even</option>
                </Form.Select>
              </Form.Group>
              <div className="d-flex flex-column align-items-center justify-content-between flex-md-row align-items-center justify-content-between gap-md-5">
                <Button className="mt-4" variant="primary" onClick={clearForm}>
                  Clear
                </Button>
                <Button className="mt-4" type="submit">
                  Search
                </Button>
              </div>
            </Form>
          </div>
        }
      </Container>
    </div>
  );
};

export default Trades;
