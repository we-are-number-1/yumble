import React, {useEffect} from 'react';

/**
 *
 * @return {*}
 */
function ResultPage() {
  useEffect(() => {
    document.title = 'Time to go eat!';
  }, []);

  return (
    <>
      <p>Result</p>
    </>
  );
}

export default ResultPage;
