import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFetchUpdateStrategies } from "../../shared/hooks/useFetchUpdateStrategies";
import { useStrategiesHooks } from "./Strategy.hooks";

const AddStrategy = () => {
  const [data,setData] = useState({ strategyName: ""})
  const {categories,refetchCategories} = useFetchUpdateStrategies()
  const { addStrategyData} = useStrategiesHooks();

  function handleChange(e){
    e.preventDefault();
    const {name,value} = e.target;
    setData(prev =>({
      ...prev,[name]:value
    }))
    
   }

  async function submit(e){
    e.preventDefault();
    if(data.stratergyName === ""){
      alert("Please enter a stratergy name");
      return;
    } 

    console.log(categories);
    const hasCategory = categories.some(ele=>ele.strategyName === data.strategyName)

    if(hasCategory){
      alert("Startergy already exisits")
    }
    else{
      console.log(data)
      const result = await addStrategyData(data);
      console.log(result)
      if(result.success){
        alert("New stratergy created successfully")
        refetchCategories();
      }
      else{
        alert("Error creating new stratergy."+"\n"+"Server message : "+result.message)
      }
    }
    setData(prev =>({
      ...prev,strategyName:""
    }))
  }

  return (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center align-items-sm-start">
      <h4>ADD STARTEGY</h4>
      <div style={{ minWidth: "20dvw"}} >
        <Form className="d-flex flex-column justify-content-center align-items-center flex-sm-row align-items-md-center justify-content-md-center border-0 shadow-sm rounded-4 p-4 mt-2 mb-5 bg-white"
          onSubmit={submit}
        >
          <Form.Group className="mt-2 w-100" controlId="newStrategy">
            <Form.Control
              type="text"
              placeholder="Enter strategy name"
              name="strategyName"
              onChange={handleChange}
              value = {data.strategyName}
            />
          </Form.Group>

          <div className="d-flex flex-column mt-2 align-items-center justify-content-center flex-xl-row align-items-center justify-content-center ms-sm-4 mt-sm-0">
            <Button className="mt-2" type="submit">Add</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddStrategy;
