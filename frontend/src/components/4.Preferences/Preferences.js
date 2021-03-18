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
  const [Price, setPrice] = useState('0,5');
  const [Distance, setDistance] = useState('5'); // default to 20
  const [Location, setLocation] = useState(undefined);
  const [Cuisines] = useState([]);
  // const [coordinates, setCoordinates] = useState({lat: null, lng: null});

  // TODO need to set default time
  const [Timer, setTimer] = useState(300);

  // genereate code for the session
  const [code, setCode] = useState(() => {
    axios.get('sessions').then((response) => {
      // ensure you only do it once
      // currently logs twice?
      setCode(response.data.sessionId);
    });
  });

  // TODO temporary using code
  const postPreference = () => {
    // change string to array form
    const formattedPrice = Price.split(',').map((x) => +x);

    const newPref = {
      sessionId: code,
      location: Location,
      distance: Number(Distance),
      cuisines: Cuisines,
      price: formattedPrice,
      timer: Timer,
    };

    console.log(newPref);

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
          <h1 className={style.largeMargin}>Select your Preferences</h1>
          <div className={style.smallMargin}>
            <AutocompleteSearchBox setLocation={setLocation} />
          </div>
          <div>
            Range
            <input
              onChange={(e) => {
                setDistance(e.target.value);
              }}
              type='range'
              min='1'
              max='20'
              step='1'
              defaultValue={Distance}
              // value='10'
            />
            <p>{Distance} KM</p>
          </div>
          <div>
            Timer
            <input
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
            <div className='pricePicker'>
              <select
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              >
                {/* Either hardcode or get from api */}
                <option value='0,5'>$0-$5</option>
                <option value='5,10'>$5-$10</option>
                <option value='10,15'>$10-$15</option>
                <option value='15,30'>$15-$30</option>
              </select>
            </div>
          </div>

          <Link to={'/Lobby/' + code}>
            {/* need to make a post */}
            <button onClick={postPreference} className='GoButton'>
              Go
            </button>
          </Link>

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
      </div>
    </>
  );
}

export default Preferences;
