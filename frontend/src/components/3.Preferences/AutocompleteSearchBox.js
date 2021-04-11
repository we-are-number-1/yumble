import React, {useState} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {getLocationCoordinates} from '../Common/LocationHelper';
import './AutocompleteSearchBox.css';

const AutocompleteSearchBox = ({setLocation, sendCoordinates}) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (value) => {
    setAddress(value);
    setLocation(value);
    const result = await getLocationCoordinates(value);
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
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({getInputProps, suggestions, getSuggestionItemProps}) => (
          <div>
            <input
              className={'SearchBox'}
              {...getInputProps({placeholder:
                ' Grafton, Auckland, New Zealand'})}
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
