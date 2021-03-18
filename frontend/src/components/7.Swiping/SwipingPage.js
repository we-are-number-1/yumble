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
      <p>Swiping</p>
      <button
        onClick={() => hitDummyEndpoint()}
        className='SmallBtn'
        id='HelpButton'
      >
        test endpoint
      </button>
    </>
  );
}

export default SwipingPage;
