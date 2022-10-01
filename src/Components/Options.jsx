import React from "react";
import countries from "./Countries";

function Options() {
  const countryArr = [];
  for (let countryCode in countries) {
    const optionTag = (
      <option value={countryCode} key={countryCode}>
        {countries[countryCode]}
      </option>
    );
    countryArr.push(optionTag);
  }

  return countryArr;
}

export default Options;
