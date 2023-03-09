import React from "react";

const ZipCode = ({ updateZipCode, defaultValue }) => {

    return (
        <>
        <label className="px-1">Enter Zip Code  </label>
        <input 
        name = "zipCode" 
        type="text"
        onChange= {updateZipCode}
        defaultValue ={defaultValue}
         />
        </>
    )
}

export default ZipCode;