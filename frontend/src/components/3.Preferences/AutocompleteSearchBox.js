import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { getLocationCoordinates } from '../Common/LocationHelper';
import './AutocompleteSearchBox.css';

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
              {...getInputProps({
                placeholder: 'Grafton, Auckland, New Zealand',
              })}
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
