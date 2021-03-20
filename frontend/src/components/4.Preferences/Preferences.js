import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import {getNearbyRestaurants} from '../Common/LocationHelper';
import AutocompleteSearchBox from './AutocompleteSearchBox';
import style from './Preferences.module.css';
import axios from 'axios';

/**
 *
 * @return {*}
 */
function Preferences() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  // TODO should be set to 'default' price range
  const [Price, setPrice] = useState('1');
  const [Distance, setDistance] = useState('5000');
  const [Location, setLocation] = useState('');
  const [Cuisines] = useState([]);
  const [Coordinates, setCoordinates] = useState({lat: null, lng: null});

  // TODO need to set default time
  const [Timer, setTimer] = useState(300);

  // genereate code for the session
  const [code, setCode] = useState(() => {
    axios.get('sessions').then((response) => {
      // ensure you only do it once
      setCode(response.data.sessionId);
    });
  });

  useEffect(() => {
    document.title = 'Choose game settings';
  }, []);

  // Move this function to inside the master function by Aniket
  /**
   *
   */
  function handleSearch() {
    getNearbyRestaurants(Coordinates, Distance, 'chinese');
  }

  const postPreference = () => {
    // change string to array form
    // const formattedPrice = Price.split(',').map((x) => +x);

    const newPref = {
      sessionId: code,
      location: Location,
      distance: Number(Distance),
      cuisines: Cuisines,
      price: Number(Price), // formattedPrice,
      timer: Timer,
      coordinates: Coordinates,
    };

    console.log(newPref);
    // TODO coordinates need to be sent somewhere?
    console.log(Coordinates);

    axios
        .post('../preferences', newPref)
        .then((res) => {
          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
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
            />
          </div>
          <div>
            <div className={style.RangeAndTimerText}>Range</div>
            <input className={style.Slider}
              onChange={(e) => {
                setDistance(e.target.value);
              }}
              type='range'
              min='1000'
              max='20000'
              step='1000'
              defaultValue={Distance}
            />
            <div className={style.SliderText}>
              Distance: {Distance/1000} KM</div>
          </div>
          <div>
            <div className={style.RangeAndTimerText}>Timer</div>
            <input className={style.Slider}
              onChange={(e) => {
                setTimer(e.target.value);
              }}
              type='range'
              min='180'
              max='1800'
              step='60'
              defaultValue={Timer}
            />
            <div className={style.SliderText}>Time:{' '}
              {Timer / 60} Minutes</div>
          </div>
          {/* <div>Cusinies</div> */}
          <div className={style.priceText}>
            Price
            <div>
              <select className={style.pricePicker}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              >
                {/* Either hardcode or get from api */}
                <option value='1'>$</option>
                <option value='2'>$  $</option>
                <option value='3'>$  $  $</option>
                <option value='4'>$  $  $  $</option>
              </select>
            </div>
          </div>
          <Link to='/'>
            <button className='SmallBtn' id='BackButton'>
              Back
            </button>
          </Link>

          <button
            onClick={() => setButtonPopup(true)}
            className='SmallBtn'
            id='HelpButton'
          >
            help?
          </button>
          <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
            <p>
              If you are visiting this page, you are likely here because you are
              searching for a random sentence. Sometimes a random word just is
              not enough, and that is where the random sentence generator comes
              into play. By inputting the desired number, you can make a list of
              as many random sentences as you want or need. Producing random
              sentences can be helpful in a number of different ways.
            </p>
          </Help>
          <Link to={'/Lobby/' + code}>
            {/* need to check if an address is provided */}
            <button
              disabled={Coordinates.lat == null && Coordinates.lng == null}
              onClick={postPreference, handleSearch}
              className={style.GoPrefButton}
            >
              Go
            </button>
          </Link>
        </div>
        <div id="dummyMap" style={{visibility: 'hidden'}}></div>
      </div>
    </>
  );
}
export default Preferences;
