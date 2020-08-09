import './App.css';
import InfoBox from './InfoBox';

import React, { useState, useEffect } from 'react';
import {FormControl, MenuItem, Select} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);

  useEffect(() => {
    const getCountriesDate = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2
            }));
            setCountries(countries);
        });
    };
    getCountriesDate();
  },[]);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country)=> (
              <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
            ))}
            {/* <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
          <InfoBox title="Coronavirus Recoverd" cases={123} total={3000}/>
          <InfoBox title="Deaths" cases={123} total={4000}/>
        </div>

        {/*Table */}
        {/*Graph */}
        
        {/*Map */}
    </div>
  );
}

export default App;
