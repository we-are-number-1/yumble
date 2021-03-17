import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const AutocompleteSearchBox = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({lat: null, lng: null});

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const google = window.google;

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
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <input className={'Preferences'}
              {...getInputProps({placeholder: 'Enter a place'})} />
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
