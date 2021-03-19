import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import AutocompleteSearchBox from './AutocompleteSearchBox';
import style from './Preferences.module.css';
import axios from 'axios';

/**
 *
 * @return {*}
 */
function Preferences() {
  useEffect(() => {
    document.title = 'Choose game settings';
  }, []);
  const [ButtonPopup, setButtonPopup] = useState(false);

  // TODO should be set to 'default' price range
  const [Price, setPrice] = useState('1');
  const [Distance, setDistance] = useState('5'); // default to 20
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
            Range
            <input className={style.Slider}
              onChange={(e) => {
                setDistance(e.target.value);
              }}
              type='range'
              min='1'
              max='20'
              step='1'
              defaultValue={Distance}
            />
            <p>{Distance} KM</p>
          </div>
          <div>
            Timer
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
            <p>{Timer / 60} Minutes</p>
          </div>
          {/* <div>Cusinies</div> */}
          <div>
            Price
            <div>
              <select className={style.pricePicker}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              >
                {/* Either hardcode or get from api */}
                <option value='1'>$0-$5</option>
                <option value='2'>$5-$10</option>
                <option value='3'>$10-$15</option>
                <option value='4'>$15-$30</option>
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
        </div>
        <Link to={'/Lobby/' + code}>
          {/* need to check if an address is provided */}
          <button style={{marginTop: '1vw'}}
            disabled={Coordinates.lat == null && Coordinates.lng == null}
            onClick={postPreference}
            className='GoButton'
          >
              Go
          </button>
        </Link>
      </div>
    </>
  );
}

export default Preferences;
