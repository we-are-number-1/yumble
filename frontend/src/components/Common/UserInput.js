import React from 'react';
import './UserInput.css';

/**
 * @param {*} props
 * @return {*}
 * 
 * This is the component to take user inputs.
 * Acts as a textfield for users to inputs such as Name and Group Name.
 * 
 */
function UserInput(props) {
  let classname;

  props.inputType == 'preferences' ?
    (classname = 'Preferences') :
    (classname = 'JoinGroup');

  return (
    <>
      <input
        className={classname}
        type={props.type}
        placeholder={props.placeholder}
        fontSize={props.fontSize}
        onChange={props.onChange}
      />
    </>
  );
}

export default UserInput;
