import React, {useEffect} from 'react';

/**
 *
 * @return {*}
 */
function LobbyPage() {
  useEffect(() => {
    document.title = 'Wait for the game to start';
  }, []);

  return (
    <>
      <p>Lobby</p>
    </>
  );
}

export default LobbyPage;
