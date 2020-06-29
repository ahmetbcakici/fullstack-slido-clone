import React, {Fragment, useState} from 'react';

import {editName} from '../../api/questioner';

function NameArea({questioner, anonFunc, isAnon}) {
  const isQuestionerAnon = questioner.name === 'Anon' ? true : false;
  const [nameEditing, setNameEditing] = useState(false);
  const [name, setName] = useState('');

  const handleEditName = () => {
    editName({questionerId: questioner._id, name});
  };

  const renderAskingAs = () => {
    if (isQuestionerAnon) return <p>Asking as Anon</p>;

    if (isAnon)
      return (
        <Fragment>
          <p>Asking as Anon</p>
          <p onClick={anonFunc}>Switch to {questioner.name}</p>
        </Fragment>
      );

    /* if(!isAnon) */
    return (
      <Fragment>
        <p>
          Asking as {questioner.name}{' '}
          <b onClick={() => setNameEditing(true)}>edit</b>
        </p>
        <div style={{display: !nameEditing && 'none'}}>
          <input
            type="text"
            value={name}
            onChange={({target: {value}}) => setName(value)}
          />
          <button onClick={handleEditName}>OK</button>
        </div>
        <p onClick={anonFunc}>Switch to Anon</p>
      </Fragment>
    );
  };

  return <Fragment>{renderAskingAs()}</Fragment>;
}

export default NameArea;
