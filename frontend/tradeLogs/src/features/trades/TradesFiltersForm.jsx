import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const TradesFiltersForm = ({symbol,clear,apply,initial,clearData,close}) => {

   const [formData,setFormData] = useState(initial);

   function handleChange(e){
    e.preventDefault();
    const {name,value} = e.target;
    setFormData(prev=>({
      ...prev,[name] : value
    }))
   }

   function submit(e){
    e.preventDefault();
    apply(formData)
   }

  return (
    <div style={{minWidth :"170px",maxWidth:"20vw"}}>
      <Form
        className="d-flex flex-column justify-content-center align-items-start align-items-md-center border-0 shadow-sm rounded-4 p-4 my-5 bg-white w-100"
        onSubmit={submit}
      >
        <Form.Group className="mt-2 w-100" controlId="fromDate">
          <Form.Label>From date</Form.Label>
          <Form.Control
            type="text"
            placeholder="mm/dd/yyyy"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-4 w-100" controlId="toDate">
          <Form.Label>To date</Form.Label>
          <Form.Control
            type="text"
            placeholder="mm/dd/yyyy"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-4 w-100" controlId="contract">
          <Form.Label>Contract</Form.Label>
          <Form.Select
            name="contract"
            value={formData.contract}
            onChange={handleChange}
          >
            <option value="">select</option>
            <option value="perpetual futures">perpetual futures</option>
            <option value="options">options</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-4 w-100" controlId="symbol">
          <Form.Label>Symbol</Form.Label>
          <Form.Select
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {symbol?.map((res, key) => (
              <option value={res} key={key}>
                {res}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-4 w-100" controlId="longShort">
          <Form.Label>Long/Short</Form.Label>
          <Form.Select
            name="longShort"
            value={formData.longShort}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          className="mt-4 w-100"
          controlId="validationCustom01"
        >
          <Form.Label>P/L</Form.Label>
          <Form.Select name="pL" value={formData.pL} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Profit">Profit</option>
            <option value="Loss">Loss</option>
            <option value="Break even">Break even</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex flex-column align-items-center justify-content-between flex-xl-row align-items-center justify-content-between w-100 gap-md-3">
           <Button className="mt-4" variant="primary" onClick={close}>
            Close
          </Button>
          <Button className="mt-4" variant="primary" onClick={()=>{clear()}}>
            Clear
          </Button>
          <Button className="mt-4" type="submit">
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TradesFiltersForm;
