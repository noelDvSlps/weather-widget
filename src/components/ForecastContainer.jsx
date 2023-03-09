import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import WindSpeedToggle from "./WindSpeedToggle";
import { WEATHER_API, WEATHER_URL_1, WEATHER_URL_2 } from "../constants";
import ZipCode from "./ZipCode";
class ForecastContainer extends React.Component {
  state = {
    data: [],
    loading: false,
    error: false,
    errorNumber: "",
    degreeType: "fahrenheit",
    windSpeedType: "mph",
    zipCode: "94509",
    city: "Antioch",
    country: "US"
  };
  async componentDidMount() {
   
    const zipCode = this.state.zipCode;
    this.setState({ loading: true });
    try {
      const response = await fetch(`${WEATHER_URL_1}${zipCode}${WEATHER_URL_2}${WEATHER_API}`);
      if (response.ok) {
        // console.log(response);
        const json = await response.json();
        
        const data = json.list
          .filter((day) => day.dt_txt.includes("00:00:00"))
          .map((item) => ({
            temp: item.main.temp,
            dt: item.dt,
            date: item.dt_txt,
            imgId: item.weather[0].id,
            desc: item.weather[0].description,
            feels_like: item.main.feels_like,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
          }));
        this.setState({ data, city: json.city.name, country: json.city.country , loading: false, error: false, errorNumber: 0});
        console.log(json);
      } 
      else  {
        
       
        this.setState({ loading: false, error: true, errorNumber: response.status, data: [] });
      }
    } catch (err) {
     
      console.error("There was an error.", err);
      
    }
  }

  updateForecastDegree = ({ target: { value } }) =>
    this.setState({ degreeType: value });
  
    updateWindSpeedType = ({ target: { value } }) =>
    this.setState({ windSpeedType: value });

    updateZipCode = (({ target: { value } }) =>
    this.setState({ zipCode: value },this.componentDidMount));
  


  render() {
    const { loading, error, data, degreeType, windSpeedType, zipCode, city, country, errorNumber } = this.state;
    return (
      <div className="container mt-5 mb-5">
        
        <h1 className="display-1 jumbotron bg-light py-5 mb-5">
          5-Day Forecast
        </h1>
        <ZipCode  updateZipCode={this.updateZipCode} defaultValue = {zipCode}/><br />
        <h5 className="display-5 text-muted">{!error ? `${city}, ${country}` : "not found"}</h5>
          <DegreeToggle updateForecastDegree={this.updateForecastDegree} degreeType={degreeType} />
        <br />
        <WindSpeedToggle  updateWindSpeedType = {this.updateWindSpeedType} windSpeedType = {windSpeedType} />
        <div className="row justify-content-center">
          {!loading ? (
            data.map((item) => 
            <DayCard 
            key={item.dt} 
            data={item} 
            degreeType={degreeType}
            windSpeedType ={windSpeedType}
            zipCode = {zipCode}
            />
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
          
         
         {(error && !(errorNumber > 399 && errorNumber < 500)) &&  <h3 className="text-danger">Error loading data...☹️</h3>}
      </div>
    );
  }
}

export default ForecastContainer;
