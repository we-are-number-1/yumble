import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { getLocationCoordinates } from '../Common/LocationHelper';
import './AutocompleteSearchBox.css';

const AutocompleteSearchBox = ({ setLocation, sendCoordinates }) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (value) => {
    console.log('Changing stuff: ', value);
    setAddress(value);
    setLocation(value);
    if (value) {
      console.log('there is stuff');
      const result = await getLocationCoordinates(value);
      sendCoordinates(result);
    }
  };
  const searchOptions = {
    location: new google.maps.LatLng(-36.8, 174.8),
    radius: 2000,
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleSelect}
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
