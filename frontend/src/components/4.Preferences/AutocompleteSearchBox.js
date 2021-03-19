import React, {useState} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {getLocationCoordinates} from '../Common/LocationHelper';
import '../4.Preferences/AutocompleteSearchBox.css';

const AutocompleteSearchBox = ({setLocation, sendCoordinates}) => {
  const [address, setAddress] = useState('');
  // const [coordinates, setCoordinates] = useState({lat: null, lng: null});

  // console.log(coordinates);

  const handleSelect = async (value) => {
    setAddress(value);
    // setCoordinates(latLng);
    setLocation(value);
    // sendCoordinates(latLng);
    const result = await getLocationCoordinates(value);
    sendCoordinates(result);
  };

  const google = window.google;

  // Default the search location around New Zealand
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
              {...getInputProps({placeholder: 'Enter a place'})}
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
