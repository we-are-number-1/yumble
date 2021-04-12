import React, {useState} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {getLocationCoordinates} from '../Common/LocationHelper';
import './AutocompleteSearchBox.css';

/**
 * @param  {*} {setLocation, sendCoordinates}
 * @return {*}
 * 
 * This is the component for the restaurant location search box.
 * The user will begin typing an area, and a dropdown will appear 
 * showing the most applicable locations based on google maps search.
 */
const AutocompleteSearchBox = ({setLocation, sendCoordinates}) => {
  const [address, setAddress] = useState('');

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
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({getInputProps, suggestions, getSuggestionItemProps}) => (
          <div>
            <input
              className={'SearchBox'}
              {...getInputProps({placeholder:
                ' Street, City, Country'})}
            />
            <div>
              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {style})}
                    key={index}
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
