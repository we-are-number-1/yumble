import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const AutocompleteSearchBox = ({setLocation}) => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({lat: null, lng: null});

  console.log(coordinates);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setLocation(value);
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
      {/* <Link to="/" state={coordinates}>
        <button
          disabled={(coordinates.lat === null && coordinates.lng === null)}
          className='GoButton'
        >
          Go
        </button>
      </Link> */}
    </div>
  );
};

export default AutocompleteSearchBox;
