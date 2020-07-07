import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {editName} from '../../store/actions/participant';

function NameArea({eventId, anonFunc, isAnon}) {
  const participant = useSelector((state) => state.participantReducer);
  const [isParticipantAnon, setIsParticipantAnon] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (participant)
      setIsParticipantAnon(participant.name === 'Anon' ? true : false);
  }, [participant]);

  const NameEdit = () => (
    <div style={{display: !nameEditing && 'none'}}>
      <input
        type="text"
        value={name}
        onChange={({target: {value}}) => setName(value)}
      />
      <button onClick={handleEditName}>OK</button>
    </div>
  );

  const handleEditName = () => {
    dispatch(editName({eventId, participantId: participant._id, name}));
    setNameEditing(false);
  };

  const renderAskingAs = () => {
    if (isParticipantAnon)
      return (
        <Fragment>
          <p>
            Asking as Anon <b onClick={() => setNameEditing(true)}>edit</b>
          </p>
          {NameEdit()}
        </Fragment>
      );

    if (isAnon)
      return (
        <Fragment>
          <p>Asking as Anon</p>
          <p onClick={anonFunc}>Switch to {participant.name}</p>
        </Fragment>
      );

    /* if(!isAnon) */
    return (
      <Fragment>
        <p>
          Asking as {participant.name}{' '}
          <b onClick={() => setNameEditing(true)}>edit</b>
        </p>
        {NameEdit()}
        <p onClick={anonFunc}>Switch to Anon</p>
      </Fragment>
    );
  };

  return <Fragment>{participant ? renderAskingAs() : <p>loading</p>}</Fragment>;
}

export default NameArea;
