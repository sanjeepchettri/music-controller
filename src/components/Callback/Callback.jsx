import React, { useEffect } from 'react'
import axios from 'axios'

const Callback = () => {
    const callBackApi  = async() => {
        const res = await axios.post("/spotify/redirect") 
    } 

    useEffect( () => {
        callBackApi();
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Callback
