import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';
import DataVisual from './DataVisual';
import Result from './Result';
import SwipeCard from '../Common/SwipeCard';
import axios from 'axios';
import './ResultPage.css';
import {SocketContext} from '../../sockets/SocketContext';
import {Container, Row, Col} from 'react-bootstrap';



// Dummy data, should be retrieved by sockets
const name = 'Lonestar';
const location = 'Botany';
const cuisine = 'European';
const price = '$$$';
const rating = '4.0';

/**
 * @param {*} props
 * @return {*}
 * TODO: remove hard-coded location for the winning restaurant coordinates
 */
function ResultPage() {
  // const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const [ResultPopup, setResultPopup] = useState(false);
  const [cardList, setCardList] = useState(null);
  const [data, setData] = useState({name, location, cuisine, price, rating});
  const [pie, setPie] = useState(null);
  const [chart, setChart] = useState(false);
  const socketContext = useContext(SocketContext);


  useEffect(() => {
    document.title = 'Time to go eat!';
    axios
        .get('sessions/'+ socketContext.code)
        .then((res) => {
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
    if (cardList) {
      const card = cardList[0];
      setData({
        name: card.name,
        location: card.location,
        cuisine: cuisine,
        price: price,
        rating: rating,
        // Update images so that it can retrieve the correct one
        // instead of this hard coded version
        // images: `https://c.files.bbci.co.uk/050B/production/_103119210_lazytown2.jpg`
      });

      console.log(cardList);
      const pieChart = {};
      pieChart.labels = [];
      const votes = [];
      for (let i = 0; i < cardList.length; i++) {
        console.log(i);
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
      <h1 className='Title'>yumble</h1>
      <h1 className='ResultTitle'>Top Choice</h1>
      <Container style={{ marginTop: '2em', maxHeight:'100%' }} >
      <div className='MakeCentre'>

        
          <div className='MainContainer' style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                }}> 
            <Row lg={12} style={{                   
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth:'95%' }} className='justify-content-md-center' >
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxHeight: '50%',
                  marginTop: '1em',
                }}
                xs={{span: 12, order: 1}}
                md={{span: 12, order: 1}}
              >
                <SwipeCard data={data}/>
              </Col>
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                lg={6}
                xs={{span: 12, order: 2}}
                md={{span: 12, order: 2}}>

                
                <button
                  onClick={() => setResultPopup(true)}
                  className='BigBtn'
                  id='Resultbutton'
                  style={{fontSize:'2em', marginTop:'0.1em', marginBottom:'0.1em'}}
                  >
                  See results
                </button>
                <Result trigger={ResultPopup} setTrigger={setResultPopup}>
                  {chart&&<DataVisual className='DataVisual' data={pie}/>}
                </Result>

                
              </Col>
            </Row>
          </div>
        
        <button
          onClick={() => setMapPopup(true)}
          className='BigBtn'
          id='GoogleMaps_btn'
          style={{margin:'0'}}
        >
          View on Google Maps
          <Icon />
        </button>
        <MapModal trigger={MapPopup} setTrigger={setMapPopup}
          restaurantLocation={{lat: -36.8523, lng: 174.7691}} />
      </div>
      </Container>
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