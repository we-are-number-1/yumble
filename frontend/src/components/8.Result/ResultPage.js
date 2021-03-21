import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';
import DataVisual from './DataVisual';
import SwipeCard from '../Common/SwipeCard';
import './ResultPage.css';

const pieChartData = {
  // Replace labels with restuarant names from 'swiping' pages
  labels: ['Food Place 1', 'Food Place 2',
    'Food Place 3', 'Food Place 4', 'Food Place 5', 'Food Place 6'],
  datasets: [
    {
      label: '# of Votes',
      // Replace numbers with number of votes from 'swiping' page
      data: [12, 19, 3, 5, 2, 3],
      borderColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Dummy data, should be retrieved by sockets
const name = 'Lonestar';
const location = 'Botany';
const cuisine = 'European';
const price = '$$$';
const rating = '4.0';
const Data = {name, location, cuisine, price, rating};

/**
 * @param {*} props
 * @return {*}
 * TODO: remove hard-coded location for the winning restaurant coordinates
 */
function ResultPage(props) {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);


  useEffect(() => {
    console.log(props.location.state);
    document.title = 'Time to go eat!';
  }, []);

  return (
    <>
      <div className='MakeCentre' id='ExtraHeight'>
        <h1 className='ResultTitle'>Top Choice</h1>
        <div className='MainContainer'>
          <SwipeCard data={Data}/>
          <DataVisual className='DataVisual' data={pieChartData}/>
          {/* className='DataVisual' */}
        </div>
        <button
          onClick={() => setMapPopup(true)}
          className='BigBtn'
          id='GoogleMaps_btn'
        >
          View on Google Maps
          <Icon />
        </button>
        <MapModal trigger={MapPopup} setTrigger={setMapPopup}
          restaurantLocation={{lat: -36.8523, lng: 174.7691}} />
      </div>

      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >help?</button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>You are all set! Click on [View on Google Maps]
          to see where you and your friends are going.</p>
      </Help>
    </>
  );
}

export default ResultPage;
