import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PlacesAutocomplete,
{geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {
  getNearbyRestaurants} from '../Common/LocationHelper';

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

  // Default the search location around New Zealand
  const searchOptions = {
    location: new google.maps.LatLng(-36.8, 174.8),
    radius: 2000,
  };

  /**
 */
  function handleSearchClick() {
    getNearbyRestaurants(coordinates, '5000', 'chinese');
  }

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

            <input className={'SearchBox'}
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
      <div id="dummyMap" style={{visibility: 'hidden'}}></div>
      <Link to="/">
        <button
          disabled={(coordinates.lat === null && coordinates.lng === null)}
          className='GoButton'
          onClick={handleSearchClick}
        >
          Go
        </button>
      </Link>
    </div>
  );
};

export default AutocompleteSearchBox;
