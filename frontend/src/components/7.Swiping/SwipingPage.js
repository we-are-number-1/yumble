import React, {useEffect} from 'react';
import axios from 'axios';

/**
 *
 * @return {*}
 */
function SwipingPage() {
  useEffect(() => {
    document.title = 'Yes or No?';
  }, []);

  const hitDummyEndpoint = () => {
    axios.get('/sessions/testCard').then((response) =>{
      console.log(response.data);
    });
  };

  return (
    <>
      <h1 className='Title'> yumble</h1>
      <div className='MakeCentre'>
        <h1 className='TimeCounter'> Remaining time: s </h1>
        <div className="SwipeCard">
          <div className="CardImage"></div>
          {/* Name */}
          {/* <div><h5>Hi</h5></div> */}
          <div id="grid">
            <div id="item1">hello </div>
            <div id="item2">hi </div>
            <div id="item3">how</div>
            <div id="item4">are </div>
            <div id="item5">you</div>

          </div>

        </div>
      </div>
    </>
  );
}

export default SwipingPage;
