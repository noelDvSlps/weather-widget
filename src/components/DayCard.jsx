import React from "react";
import moment from "moment/moment";

const DayCard = ({ data, degreeType, windSpeedType }) => {
const { temp, dt,  imgId, desc, feels_like, humidity, windSpeed } = data;

const newDate = new Date();
newDate.setTime(dt*1000);

const icon= `owf owf-${imgId} owf-5x`

const fahrenheit = Math.round(temp);
const celsius = Math.round((fahrenheit-32) * (5/9))
const feelsLikeFahrenheit = Math.round(feels_like);
const feelsLikeCelsius = Math.round((feelsLikeFahrenheit-32) * (5/9))
const mph = (windSpeed).toFixed(2);
const kmph =((mph / 1.609)).toFixed(2);

    return(
        <div className="col-sm-2">
            <div className="card">
                <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <i className={icon} />
                <h2>{degreeType === "celsius"  ? `${celsius}℃` : `${fahrenheit}℉`} </h2>
                <div className="card-body">
                    <p className="card-text">{desc}</p>
                    <p className="card-text">Feels like {degreeType === "celsius"  ? `${feelsLikeCelsius}℃` : `${feelsLikeFahrenheit}℉`}</p>
                    <p className="card-text">Humidity: {humidity}</p>
                    <p className="card-text">Wind Speed: {windSpeedType==="mph" ? `${mph} mph` : `${kmph} kmph` }</p>
                </div>

            </div>

        </div>

    )

}

export default DayCard;