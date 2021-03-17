import React, {useEffect} from 'react';

/**
 *
 * @return {*}
 */
function SwipingPage() {
  useEffect(() => {
    document.title = 'Yes or No?';
  }, []);

  return (
    <>
      <p>Swiping</p>
    </>
  );
}

export default SwipingPage;
