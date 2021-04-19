import React, { useState, useEffect, useContext } from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';

import Icon from '../Common/MapsPinpoint';

import axios from 'axios';

import { SocketContext } from '../../sockets/SocketContext';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SwipeCard from '../Common/SwipeCard';

import MapModal from '../Common/MapModal';
import './ResultPage.css';

import DataVisual from './DataVisual';
import Result from './ResultPopup';

// Dummy data, should be retrieved by sockets
const name = 'Lonestar';
const location = 'Botany';
const price = '$$$';
const rating = 4.0;

/**
 * @param {*} props
 * @return {*}
 *
 * This is the result screen. The users in the game be shown the most voted restaurant
 * that has won the game. Users can choose to see the vote breakdown, that is shown on a popup
 * and represented as a pie chart.
 *
 * If 0 restaurants were selected then another screen informing the user
 * to try again will be shown.
 *
 */
function ResultPage(props) {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const [ResultPopup, setResultPopup] = useState(false);
  const [cardList, setCardList] = useState(null);
  const [data, setData] = useState({ name, location, price, rating });
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

  const pieColours = [];

  /**
   * This function generates a random HSL value
   * @return {string} A string that represents a HSL colour value
   */
  const randomColour = () => {
    return 'hsl(' + 360 * Math.random() + ',' + 100 + '%,' + 60 + '%)';
  };

  useEffect(() => {
    document.title = 'Time to go eat!';
    axios
      .get('sessions/' + socketContext.code)
      .then((res) => {
        setHasResult(false);
        // Sort Restaurants by number of Keen votes
        setCardList(
          res.data.results.sort(function (a, b) {
            return b.numberOfVotes - a.numberOfVotes;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Creating the Top Choice Card and pie chart from the vote data.
  // Each selected restaurant is shown as a legend and the overall voting
  // distribution is shown.
  useEffect(() => {
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
        if (cardList[i].name) {
          pieChart.labels.push(cardList[i].name);
          votes.push(cardList[i].numberOfVotes);
          pieColours.push(randomColour());
        } else {
          break;
        }
      }

      pieChart.datasets = [
        {
          label: '# of Votes',
          data: votes,
          defaultFontColor: '#fff',
          borderColor: '#000',
          backgroundColor: pieColours,
          hoverBackgroundColor: pieColours,
          borderWidth: 1,
        },
      ];
      setPie(pieChart);
    }
  }, [cardList]);

  useEffect(() => {
    if (pie) {
      setChart(true);
    }
  }, [pie]);

  // Will only show the winning restaurant if at least 1 restaurant was selected.
  // If 0 restaurants were selected then another screen
  // informing the user to try again will be shown.
  return (
    <>
      <h1 className='Title'>yumble</h1>
      <Container style={{ marginTop: '4em', maxHeight: '100%' }}>
        <div className='MakeCentre'>
          <Card
            id='Card-field'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {hasResult === undefined ? (
              <></>
            ) : hasResult === true ? (
              <>
                <Card.Header
                  as='h2'
                  id='Card-Header'
                  className='text-center'
                  style={{ width: '100%' }}
                >
                  {' '}
                  Top Choice
                </Card.Header>
                <Card.Body
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Row
                    lg={12}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      maxWidth: '95%',
                    }}
                    className='justify-content-md-center'
                  >
                    <Col
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxHeight: '50%',
                        marginTop: '1em',
                      }}
                    >
                      <SwipeCard class='text-primary' data={data} />
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      lg={12}
                    >
                      <Button
                        onClick={() => setResultPopup(true)}
                        className='BigBtn'
                        id='Resultbutton'
                        style={{
                          fontSize: '2em',
                          marginTop: '0.1em',
                          marginBottom: '0.1em',
                        }}
                        variant='success'
                      >
                        See results
                      </Button>

                      <Result trigger={ResultPopup} setTrigger={setResultPopup}>
                        {chart && (
                          <DataVisual className='DataVisual' data={pie} />
                        )}
                      </Result>
                    </Col>

                    <Col
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      lg={12}
                    >
                      <Button
                        onClick={() => setMapPopup(true)}
                        className='BigBtn'
                        id='GoogleMaps_btn'
                        style={{ marginTop: '0.15em', marginBottom: '0.15em' }}
                        variant='warning'
                      >
                        View on Google Maps
                        <Icon />
                      </Button>
                      <MapModal
                        trigger={MapPopup}
                        setTrigger={setMapPopup}
                        restaurantLocation={data.coords}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </>
            ) : (
              <>
                <Card.Header
                  as='h5'
                  id='Card-Header'
                  className='text-center'
                  style={{ width: '100%' }}
                >
                  No Result Decided!
                </Card.Header>
                <Card.Body className='text-center'>
                  <p>Your group was not keen on any restaurants.</p>
                  <Button
                    variant='danger'
                    onClick={() => window.location.reload()}
                  >
                    Try Again{' '}
                  </Button>
                </Card.Body>
              </>
            )}
          </Card>
        </div>
      </Container>
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
          You are all set! Click on [View on Google Maps] to see where you and
          your friends are going.
        </p>
      </Help>
    </>
  );
}

export default ResultPage;
