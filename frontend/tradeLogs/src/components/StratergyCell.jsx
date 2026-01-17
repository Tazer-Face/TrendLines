import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFetchUpdateStratergies } from '../customHooks/useFetchUpdateStratergies';
import { useAxios } from '../customHooks/useAxiosRequests';

const StratergyCell = ({id,value,closeStrat,categories,stratVisible}) => {
  // const {stratVisible,
  //       categoriesLoading,
  //       categoriesError,
  //       refetchCategories,
  //       createStratergyData,
  //       openStrat,
  //       closeStrat,
  //       categories} = useFetchUpdateStratergies()

  const [data,setData] = useState(value ?? "");
  const [startergyData,setStartergyData] = useState("")
  
  const  { result, loading, error, refetch } = useAxios("put","http://localhost:3000/api/updateHistoryData",{_id :id , stratergy : startergyData})
  // const {}

  

  function handleChange(e){
    e.preventDefault();
    const {value} = e.target;
    setData(value)
   }

  async function handleSubmit(e){
    e.preventDefault();
    console.log(id);
    setStartergyData(data)
  }
  
  useEffect(()=>{
    refetch({_id :id , stratergy : startergyData});
    if(result.success){
      alert("Stratergy updated successfully")
      closeStrat();
    }
    else{
      if(error.success) alert("Stratergy update unsuccessfully")
    }
  },[startergyData])
  
  return (
    
    <>
      { stratVisible &&
        <Form
            className="d-flex flex-column justify-content-center align-items-start align-items-md-center border-0 shadow-sm rounded-4 p-4 my-2 bg-white w-100"
            style={{minWidth:"20dvh"}}
            onSubmit={handleSubmit}
          >
            
            <Form.Group className="mt-4 w-100" controlId="longShort">
              <Form.Label>Stratergy</Form.Label>
              <Form.Select
                name="longShort"
                value = {data}
                onChange={handleChange}
              >
                <option key={0} value="">No stratergy</option>
                { categories?.map((data,key)=>(
                  <option key={key+1} value={data.stratergyName}>{data.stratergyName}</option>
                  )) 
                }
              </Form.Select>
            </Form.Group>
            <div className="d-flex flex-column align-items-center justify-content-between flex-xl-row align-items-center justify-content-between w-100 gap-md-3">
              <Button className="mt-4" variant="primary" onClick={()=>{closeStrat()}} >
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