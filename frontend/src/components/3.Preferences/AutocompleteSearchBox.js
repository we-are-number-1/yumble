import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { getLocationCoordinates } from '../Common/LocationHelper';
import './AutocompleteSearchBox.css';

/**
 * @param  {*} {setLocation, sendCoordinates}
 * @return {*}
 * 
 * This is the component for the restaurant location search box.
 * The user will begin typing an area, and a dropdown will appear 
 * showing the most applicable locations based on google maps search.
 */
const AutocompleteSearchBox = ({ setLocation, sendCoordinates }) => {
  const [address, setAddress] = useState('');

  const handleSetAddress = (value) => {
    console.log('changed');
    if (value) {
      setAddress(value);
    } else {
      setAddress('');
    }
    // Reset coords every input to reset Go button
    sendCoordinates({ lat: null, lng: null });
  };

  const handleSelect = async (value) => {
    setAddress(value);
    setLocation(value);
    const result = await getLocationCoordinates(value);
    console.log(result);
    sendCoordinates(result);
  };
  // Using google maps for searching location
  const searchOptions = {
    location: new google.maps.LatLng(-36.8, 174.8),
    radius: 2000,
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleSetAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div style={{ position: 'relative' }}>
            <input
              className={'SearchBox'}
<<<<<<< HEAD
              {...getInputProps({placeholder:
                ' Street, City, Country'})}
=======
              {...getInputProps({
                placeholder: 'Grafton, Auckland, New Zealand',
              })}
>>>>>>> 49523eeea869faa18bc16e2b3b65b21c9cc540ce
            />
            <div className={suggestions.length > 0 ? 'Suggestions' : ''}>
              {suggestions.map((suggestion, index) => {
                const classes = suggestion.active ? 'ActiveSuggestion' : '';

                return (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={index}
                    className={`SuggestionItem ${classes}`}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default AutocompleteSearchBox;
