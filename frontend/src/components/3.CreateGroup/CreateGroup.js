import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import styles from './CreateGroup.module.css';
// import axios from 'axios';

/**
 * Go get a code
 * @return {*}
 */
function makeid() {
  // axios.post('createSession').then((response) => {
  //   console.log(response);
  // });
  return 'PING';
}

/**
 *
 * @return {*}
 */
function CreateGroup() {
  // const [code, setCode] = useState(makeid());
  const [code, setCode] = useState(undefined);

  useEffect(() => {
    document.title = 'Create a group';
    setCode(makeid());
  }, []);
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='GroupCode_Box'>
          Your group code is...
          <div className={styles.spacing}>{code}</div>
          <Link to='Preferences'>
            <button className='GoButton'>Go</button>
          </Link>
          <br />
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
            // className='SmallBtn'
            id='copy'
          >
            Copy!
          </button>
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
