import React, { useState, useEffect, useContext } from "react";
import Help from "../Common/Help";
import "../Common/Help.css";

import Icon from "../Common/MapsPinpoint";

import axios from "axios";

import { SocketContext } from "../../sockets/SocketContext";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SwipeCard from "../Common/SwipeCard";

import MapModal from "../Common/MapModal";
import "./ResultPage.css";

import DataVisual from "./DataVisual";
import Result from "./ResultPopup";

// Dummy data, should be retrieved by sockets
const name = "Lonestar";
const location = "Botany";
const price = "$$$";
const rating = 4.0;

/**
 * @param {*} props
 * @return {*}
 * TODO: remove hard-coded location for the winning restaurant coordinates
 */
function ResultPage(props) {
  // const socketContext = useContext(SocketContext);
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

  useEffect(() => {
    document.title = "Time to go eat!";
    axios
      .get("sessions/" + socketContext.code)
      .then((res) => {
        setHasResult(false);
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
        if (cardList[i].name && i < 6) {
          pieChart.labels.push(cardList[i].name);
          votes.push(cardList[i].numberOfVotes);
        } else {
          break;
        }
      }

      pieChart.datasets = [
        {
          label: "# of Votes",
          data: votes,
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
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

  return (
    <>
      <h1 className="Title">yumble</h1>
      <Container style={{ marginTop: "4em", maxHeight: "100%" }}>
        <div className="MakeCentre">
          <Card
            id="Card-field"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hasResult === undefined ? (
              <></>
            ) : hasResult === true ? (
              <>
                <Card.Header
                  as="h5"
                  id="Card-Header"
                  className="text-center"
                  style={{ width: "100%" }}
                >
                  {" "}
                  Top Choice
                </Card.Header>
                <Card.Body
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Row
                    lg={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: "95%",
                    }}
                    className="justify-content-md-center"
                  >
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxHeight: "50%",
                        marginTop: "1em",
                      }}
                    >
                      <SwipeCard class="text-primary" data={data} />
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      lg={12}
                    >
                      <Button
                        onClick={() => setResultPopup(true)}
                        className="BigBtn"
                        id="Resultbutton"
                        style={{
                          fontSize: "2em",
                          marginTop: "0.1em",
                          marginBottom: "0.1em",
                        }}
                      >
                        See results
                      </Button>

                      <Result trigger={ResultPopup} setTrigger={setResultPopup}>
                        {chart && (
                          <DataVisual className="DataVisual" data={pie} />
                        )}
                        <hr />
                      </Result>
                    </Col>

                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      lg={12}
                    >
                      <Button
                        onClick={() => setMapPopup(true)}
                        className="BigBtn"
                        id="GoogleMaps_btn"
                        style={{ marginTop: "0.15em", marginBottom: "0.15em" }}
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
      <Button onClick={() => setButtonPopup(true)} id="HelpButton">
        help?
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
