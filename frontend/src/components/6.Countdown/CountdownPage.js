import React, {useEffect} from 'react';

/**
 *
 * @return {*}
 */
function CountdownPage() {
  useEffect(() => {
    document.title = 'Get ready to begin matching...';
  }, []);

  return (
    <>
      <p>Countdoww</p>
    </>
  );
}

export default CountdownPage;
