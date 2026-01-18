import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";



const StratergyCell = ({id,value,closeStrat,categories,stratVisible,updateStrat,refresh}) => {

const [data,setData] = useState(value ?? "");
  
  function handleChange(e){
    const {value} = e.target;
    setData(value)
   }

  async function handleSubmit(e){
    e.preventDefault();
    console.log(id);
    const payload = {
      _id : id,
      stratergy : data === "" ? null : data
    }
    const res = await updateStrat(payload);
    console.log(res);
    if(res.success){
      alert("Stratergy updated successfully")
      closeStrat();
      refresh();
    }
    else{
      alert("Unable to update stratergy at the moment");
      closeStrat();
    }
  }
  
  

  if(!stratVisible) return <>{value}</>
  return (
    
    <>
      { stratVisible &&
        <Form
            className="d-flex flex-column justify-content-center align-items-start align-items-md-center border-0 shadow-sm rounded-4 p-4 my-2 bg-white w-100"
            style={{minWidth:"20dvh"}}
            onSubmit={handleSubmit}
          >
            
            <Form.Group className="mt-4 w-100" controlId="stratergy">
              <Form.Label>Stratergy</Form.Label>
              <Form.Select
                name="stratergy"
                value = {data}
                onChange={handleChange}
              >
                <option value="">No stratergy</option>
                { categories?.map((data,key)=>(
                  <option key={key} value={data.stratergyName}>{data.stratergyName}</option>
                  )) 
                }
              </Form.Select>
            </Form.Group>
            <div className="d-flex flex-column align-items-center justify-content-between flex-xl-row align-items-center justify-content-between w-100 gap-md-3">
              <Button className="mt-4" type="button" variant="primary" onClick={(e) => {e.stopPropagation();closeStrat();}} >
                Close
              </Button>
              <Button className="mt-4" type="submit">
                Apply
              </Button>
            </div>
          </Form>
        }
      </> 
    
    
  )

}
export default StratergyCell