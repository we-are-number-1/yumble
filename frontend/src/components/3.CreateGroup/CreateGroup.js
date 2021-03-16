import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import styles from './CreateGroup.module.css';
// import styled from 'styled-components';
import axios from 'axios';

/**
 * Currently a dummy method to randomly generate a code
 * @return {*}
 */
function makeid() {
  axios.post('createSession').then((response) => {
    console.log(response);
  });
  return 'PING';
  // let result = '';
  // const characters =
  //   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // const charactersLength = characters.length;
  // for (let i = 0; i < 5; i++) {
  //   result += characters.charAt(Math.floor(Math.random()
  //  * charactersLength));
  // }
  // return result;
}

/**
 *
 * @return {*}
 */
function CreateGroup() {
  useEffect(() => {
    document.title = 'Create a group';
  }, []);
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='GroupCode_Box'>
          Your group code is...
          <div className={styles.spacing}>{makeid()}</div>
          <Link to='Preferences'>
            <button className='GoButton'>Go</button>
          </Link>
        </div>
      </div>{' '}
      <Link to='/'>
        <button className='SmallBtn' id='BackButton'>
          Back
        </button>
      </Link>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Please copy this group code and send it to the user for them to join
          the room.
        </p>
      </Help>
    </>
  );
}

export default CreateGroup;
