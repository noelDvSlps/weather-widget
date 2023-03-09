import React from "react";

const WindSpeedToggle = ({ updateWindSpeedType, windSpeedType }) => {

    return (
        <>
        <label className="px-1">Select Wind Speed Type  </label>
         <select
            className="mb-4" 
            name="windSpeed" 
            id="windSpeed"
            value = {windSpeedType}
            onChange={updateWindSpeedType}
            >
            <option value="mph" >mph</option>
            <option value="kmph">kmph</option>
        </select>
        </>
       
    )



}

export default WindSpeedToggle;