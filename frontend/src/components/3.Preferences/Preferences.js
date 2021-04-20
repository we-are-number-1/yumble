import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import AutocompleteSearchBox from './AutocompleteSearchBox';
import style from './Preferences.module.css';
import { SocketContext } from '../../sockets/SocketContext';
import * as SocketEvents from '../../sockets';
import { getNearbyRestaurants } from '../Common/LocationHelper';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

/**
 *
 * @return {*}
 *
 * Screen for host to set game preferences including:
 * - Range of restaurants in Kilometres
 * - Time of each round of the game
 * - Maximum price of restaurants from $ to $$$$
 */
function Preferences() {
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);

  // TODO should be set to 'default' price range
  const [Price, setPrice] = useState('1');
  const [Distance, setDistance] = useState('5000');
  const [Location, setLocation] = useState('');
  const [Coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [redirect, setRedirect] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // default post syntax
  const [response] = useState({
    preferences: {},
    results: [],
  });

  // TODO need to set default time
  const [Timer, setTimer] = useState(5);

  // genereate code for the session
  const [code, setCode] = useState(undefined);

  useEffect(() => {
    document.title = 'Choose game settings';
    axios.post('sessions', response).then((response) => {
      // ensure you only do it once
      setCode(response.data.truncCode);
      // Host room once session has been created
      SocketEvents.hostRoom(socketContext.socket, response.data.truncCode);
    });
  }, []);

  /**
   * Wait for database to return nearby Restaurants
   * and create cards out of the Restaurants for the game.
   */
  async function handleSearch() {
    const data = await getNearbyRestaurants(Coordinates, Distance, Price);
    if (data === 'ZERO_RESULTS') {
      // the case that no Restaurant results are returned
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      setCardData(data);
    }
  }

  useEffect(() => {
    if (cardData) {
      postPreference();
    }
  }, [cardData]);

  /**
   * Leave room button, returns user to the landing page.
   */
  const goBack = () => {
    SocketEvents.leaveRoom(socketContext.socket);
  };

  const postPreference = () => {
    socketContext.setCode(code);
    socketContext.setHost(true);
    socketContext.setTimer(Timer);
    SocketEvents.setRestaurants(socketContext.socket, code, cardData);

    const newPref = {
      location: Location,
      distance: Number(Distance),
      price: Number(Price),
      timer: Timer,
      coordinates: Coordinates,
    };

    // give correct json format
    const give = {
      preferences: newPref,
    };

    axios
      .patch('../sessions/' + code, give)
      .then((res) => {})
      .catch(function (error) {
        console.log(error);
      });

    SocketEvents.joinRoom(socketContext.socket, code, 'Host');
    setRedirect(true);
  };

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className={style.MakePreference}>
          <h1 className={style.LocationTitle}>Location</h1>
          <div>
            <AutocompleteSearchBox
              setLocation={setLocation}
              sendCoordinates={setCoordinates}
              setShowErrorMessage={setShowErrorMessage}
            />
          </div>
          <div>
            <div className={style.RangeAndTimerText}>Range</div>
            <input
              className={style.Slider}
              onChange={(e) => {
                setShowErrorMessage(false);
                setDistance(e.target.value);
              }}
              type='range'
              min='1000'
              max='20000'
              step='1000'
              defaultValue={Distance}
            />
            <div className={style.SliderText}>Distance: {Distance / 1000} KM</div>
          </div>
          <div>
            <div className={style.RangeAndTimerText}>Timer</div>
            <input
              className={style.Slider}
              onChange={(e) => {
                setShowErrorMessage(false);
                setTimer(e.target.value);
              }}
              type='range'
              min='5'
              max='60'
              step='5'
              defaultValue={Timer}
            />
            <div className={style.SliderText}>Time: {Timer} Seconds</div>
          </div>
          <div className={style.priceText}>
            Max Price
            <div>
              <select
                className={style.pricePicker}
                onChange={(e) => {
                  setShowErrorMessage(false);
                  setPrice(e.target.value);
                }}
              >
                <option value='1'>$</option>
                <option value='2'>$ $</option>
                <option value='3'>$ $ $</option>
                <option value='4'>$ $ $ $</option>
              </select>
            </div>
          </div>
          <p
            className={style.ErrorMessage}
            style={{ marginTop: '1em', visibility: showErrorMessage ? 'visible' : 'hidden' }}
          >
            Please widen your search.
          </p>

          <Link to='/'>
            <Button
              variant='danger'
              size='lg'
              id='BackButton'
              onClick={() => goBack()}
            >
              Back
            </Button>
          </Link>

          <Button
            onClick={() => setButtonPopup(true)}
            variant='info'
            size='lg'
            id='HelpButton'
          >
            Help
          </Button>
          <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
            <p>
              Use this page to select a location, as well as a range from that location to find restaurants from.
              <br></br>
              Changing the timer duration will change how long you get to make a decision on each restaurant.<br></br>
              Use the price dropdown to set an upper price limit on the restaurants that will be shown.<br></br>
              Once you are happy with your preferences, click the Go button.
            </p>
          </Help>
          {redirect && (
            <Redirect
              to={{
                pathname: `/Lobby/${code}`,
                state: cardData,
              }}
            />
          )}
          {/* need to check if an address is provided */}
          <button
            disabled={!Location || Coordinates.lat === null || Coordinates.lng === null}
            onClick={() => handleSearch()}
            className={style.GoPrefButton}
          >
            Go
          </button>
        </div>
        <div id='dummyMap' style={{ visibility: 'hidden' }}></div>
      </div>
    </>
  );
}

export default Preferences;
