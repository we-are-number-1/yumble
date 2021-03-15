import React from 'react';
import styled from 'styled-components';

/**
 *
 * @return {*}
 */
function UserInput() {
  const UserInput = styled.input`
  outline: none;
  width: 80vw;
  border-radius: 20px;
  border: 4px solid #000000;
  font-size: 4vw;
  margin: 1vw;
`;

  return (
    <>
      <UserInput/>
    </>
  );
}

export default UserInput;
