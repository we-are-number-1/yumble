import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';
import DataVisual from './DataVisual';
import SwipeCard from '../Common/SwipeCard';
import axios from 'axios';
import './ResultPage.css';
import {SocketContext} from '../../sockets/SocketContext';

// Dummy data, real data is retrived from sockets
const name = 'Lonestar';
const location = 'Botany';
const price = '$$$';
const rating = 4.0;

/**
 * @param {*} props {hasResult}
 * @return {*}
 */
function ResultPage(props) {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const [cardList, setCardList] = useState(null);
  const [data, setData] = useState({name, location, price, rating});
  const [pie, setPie] = useState(null);
  const [chart, setChart] = useState(false);
  const socketContext = useContext(SocketContext);
  // use this attribute to decide what component to render
  // null -> nothing
  // false -> no result decided
  // true -> result with pie chart
  // default is null because no props is passed in
  // need to have props due to the testing purpose
  const [hasResult, setHasResult] = useState(props.hasResult);

  useEffect(() => {
    document.title = 'Time to go eat!';
    axios
        .get('sessions/'+ socketContext.code)
        .then((res) => {
          setHasResult(false);
          setCardList(res.data.results.sort(
              function(a, b) {
                return b.numberOfVotes - a.numberOfVotes;
              }));
        })
        .catch(function(error) {
          console.log(error);
        });
  }, []);

  useEffect(()=>{
    if (cardList && cardList.length > 0) {
      setHasResult(true);
      const card = cardList[0];
      setData({
        name: card.name,
        location: card.location,
        price: card.price,
        rating: card.rating,
        images: card.images,
        coords: card.coords,
      });
      const pieChart = {};
      pieChart.labels = [];
      const votes = [];
      for (let i = 0; i < cardList.length; i++) {
        if (cardList[i].name && i < 6) {
          pieChart.labels.push(cardList[i].name);
          votes.push(cardList[i].numberOfVotes);
        } else {
          break;
        }
      }

      pieChart.datasets = [{
        label: '# of Votes',
        data: votes,
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
      }];
      setPie(pieChart);
    }
  }
  , [cardList]);


  useEffect(() => {
    if (pie) {
      setChart(true);
    }
  }, [pie]);

  return (
    <>
      <div className='MakeCentre' id='ExtraHeight'>
        { hasResult === undefined ? <></> : hasResult === true ?
        <>
          <h1 className='ResultTitle'>Top Choice</h1>
          <div className='MainContainer'>
            <SwipeCard data={data}/>
            {chart&&<DataVisual className='DataVisual' data={pie}/>}
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
            restaurantLocation={data.coords} />
        </> : <>
          <h2 className='ResultTitle'> No Result Decided :( </h2>
          <h2 className='ResultTitle'> Wanna try another place ? </h2>
          <button className='ButtonReset' onClick={
            () => window.location.reload()}>
            Try Again :) </button>
        </>
        }
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
