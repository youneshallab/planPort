import React from 'react'
import { useState, useEffect} from 'react';

function LoaderAnimation({color}) {
  const [className,setClassName] = useState("lds-spinner ")
  useEffect(()=>{
    if (color === "blue"){
    setClassName("lds-spinner  lds-spinner-blue left-1/2 -translate-x-2/3")
  }
  },[color])
  
  return (
    <div className={className}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}

export default LoaderAnimation