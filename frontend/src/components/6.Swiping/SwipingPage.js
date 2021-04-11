import React, { useEffect, useState, useContext, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { SocketContext } from './../../sockets/SocketContext';
import * as SocketEvents from './../../sockets';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';
import '../6.Swiping/SwipingPage.css';
import SwipeCard from '../Common/SwipeCard';
import { Container, Row, Col } from 'react-bootstrap';
import TinderCard from 'react-tinder-card'

/**
 * @param  {*} props
 * @return {*}
 */
function SwipingPage(props) {
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const CardData = props.location.state[0];
  const [CardPass, setCardPass] = useState(null);
  const [vote, setVote] = useState(undefined);
  const [showVoteButtons, setShowVoteButtons] = useState(true);
  const [time, setTime] = useState(socketContext.countdown);
  const [Data, setData] = useState(CardData[0]);
  const [redirect, setRedirect] = useState(false);
  const swiperRef = useRef()

  useEffect(() => {
    document.title = 'Yes or No?';
    setData(CardData.shift());
    SocketEvents.endGame(socketContext.socket, goNextPge);
    SocketEvents.nextRound(socketContext.socket, getNewCard);
    setCardPass(props.location.state[0].slice());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [time]);

  const goNextPge = () => {
    setRedirect(true);
  };

  /**
   * Swipes card right when clicking yes
   */
  function clickedYes() {
    if(swiperRef.current) {
      swiperRef.current.swipe('right');
    }
  }

  /**
   * Swipes card left when clicking no
   */
  function clickedNo() {
    if(swiperRef.current) {
      swiperRef.current.swipe('left');
    }
  }
  
  /**
   * This is required as handleCardLeftScreen is called much later than 
   * when the swipe event is raised. 
   * @param {*} direction 
   */
  function handleSwipe() {
    // hide vote buttons when swiped
    setShowVoteButtons(false);
  }

  /**
   * Handle a swipe of a card to a specific direction.
   * If left, then vote is set to false
   * If right, then vote is set to right and send to server.
   * If already voted, then do nothing
   * @param {*} direction 
   */
  function handleCardLeftScreen(direction) {
    if(vote !== undefined) {
      return;
    }

    switch(direction) {
      case 'left':
        setVote(false);
        break;
      case 'right':
        SocketEvents.vote(socketContext.socket, socketContext.code, {
          name: Data.name,
          location: Data.location,
          coords: Data.coords,
          cuisine: Data.cuisine,
          price: Data.price,
          rating: Data.rating,
          images: Data.images,
        });
        setVote(true);
    }
  }

  /**
   * @param {*} timer new restaurant details
   * @return {void}
   */
  function getNewCard(timer) {
    setTime(socketContext.countdown);
    try {
      setVote(undefined)
      setShowVoteButtons(true)
      CardData.shift();
      if (CardData[0] !== undefined) {
        setData(CardData[0]);
      }
    } catch (error) {}
  }

  let voteString = ""
  let overlayStyling = ""
  if (vote !== undefined){
    voteString = vote ? "Keen" : "Nope"
    overlayStyling = vote ? "CardOverlayText-Keen" : "CardOverlayText-Nope"
  }
  const buttonHideStyling = showVoteButtons ? "" : "hide";
  return (
    <>
      <h1 className='Title'> yumble</h1>
      <h1 className='TimeCounter'> Remaining time: {time}s</h1>
      <div className='MakeCentre'>
        <Container style={{ marginTop: '2em' }}>
          <Row lg={12} className='justify-content-md-center'>
            <Col
              xs={{ span: 6, order: 2 }}
              md={{ span: 2, order: 1 }}
              className='btnColumn'
            >
              <button
                className={'YesOrNoButton ' + buttonHideStyling}
                id='NoButton'
                onClick={clickedNo}
              >
                Nope!
              </button>
            </Col>
            <Col lg={6} xs={{ span: 12, order: 1 }} md={{ span: 8, order: 2 }}>
              <div className={"CardOverlayText " + overlayStyling}>Voted: {vote === undefined ? "" : voteString}!</div>
              {
                vote === undefined ? (
                  <TinderCard className="ActionableSwipeCard" ref={swiperRef} onSwipe={handleSwipe} onCardLeftScreen={handleCardLeftScreen} preventSwipe={['top', 'bottom']}>
                    <SwipeCard data={Data} />
                  </TinderCard>
                ) : <SwipeCard vote ={vote} data={Data} />
              }
            </Col>
            <Col
              xs={{ span: 6, order: 3 }}
              md={{ span: 2, order: 3 }}
              className='btnColumn'
            >
              <button
                className={"YesOrNoButton align-items-center " + buttonHideStyling}
                id='YesButton'
                onClick={clickedYes}
              >
                Keen!
              </button>
            </Col>
          </Row>
        </Container>

        <button
          onClick={() => setMapPopup(true)}
          className='BigBtn'
          id='GoogleMaps_btn'
        >
          View on Google Maps
          <Icon />
        </button>
        <MapModal
          trigger={MapPopup}
          setTrigger={setMapPopup}
          restaurantLocation={Data.coords}
        />
      </div>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          - Click Keen! if you are keen to potentially visit this restaurant
          otherwise click Nope!.
          <br></br>- View this restaurant on the map by clicking the green
          button below the card.
        </p>
      </Help>
      {redirect && <Redirect to={{ pathname: '/Result', state: CardPass }} />}
    </>
  );
}

export default SwipingPage;