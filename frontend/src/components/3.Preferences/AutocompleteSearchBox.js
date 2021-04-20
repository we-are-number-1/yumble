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
const AutocompleteSearchBox = ({ setLocation, sendCoordinates, setShowErrorMessage }) => {
  const [address, setAddress] = useState('');

  const handleSetAddress = (value) => {
    setShowErrorMessage(false);
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
              {...getInputProps({
                placeholder: 'Street, City, Country',
              })}
            />
            <div className={suggestions.length > 0 ? 'Suggestions' : ''}>
              {suggestions.map((suggestion, index) => {
                const classes = suggestion.active ? 'ActiveSuggestion' : '';

                return (
                  <div {...getSuggestionItemProps(suggestion)} key={index} className={`SuggestionItem ${classes}`}>
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
