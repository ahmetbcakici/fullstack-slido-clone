import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {editName} from '../../store/actions/questioner';

function NameArea({anonFunc, isAnon}) {
  const questioner = useSelector((state) => state.questionerReducer);
  const [isQuestionerAnon, setIsQuestionerAnon] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (questioner)
      setIsQuestionerAnon(questioner.name === 'Anon' ? true : false);
  }, [questioner]);

  const handleEditName = () => {
    dispatch(editName({questionerId: questioner._id, name}));
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

  return <Fragment>{questioner ? renderAskingAs() : <p>loading</p>}</Fragment>;
}

export default NameArea;
