import {Redirect} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import {SocketContext} from './../../sockets/SocketContext';
import {getNearbyRestaurants} from '../Common/LocationHelper';
import * as SocketEvents from './../../sockets';
import '../Common/Help.css';

const CountDown = (props) => {
  // const history = useHistory();
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [seconds, setSeconds] = useState(socketContext.countdown);
  const CardPref = props.location.state;
  const [CardData, setCardData] = useState(0);
  let boolean = true;


  useEffect(() => {
    document.title = 'Go!';
    SocketEvents.nextRound(socketContext.socket, goNextPge);
    console.log(socketContext.countdown);
  }, []);

  useEffect(() => {
    seconds >= 0 ? setTimeout(() => setSeconds(seconds - 1), 1000) : null;
  }, [seconds]);

  useEffect(async () => {
    if (boolean) {
      setCardData(await getNearbyRestaurants(
          CardPref.coords, CardPref.dist, CardPref.cuisine));
      boolean = false;
    }
  });

  /**
   *
   */
  const goNextPge = async () => {
    // console.log('card data', CardData);
    // history.push('/Swiping', CardData);
  };

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div>
          {seconds == 0 ? (
            <div className='StartTitle'>Go!</div>
          ) : (
            <div className='StartTitle'>{seconds}</div>
          )}
        </div>
      </div>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p className='MakeTextCentre'>
          Please wait for the timer!
        </p>
      </Help>
      {seconds == -1 ?
        <Redirect to={{pathname: '/Swiping', state: CardData}}/> : null}
      <div id="dummyMap" style={{visibility: 'hidden'}}></div>
    </>
  );
};

export default CountDown;
