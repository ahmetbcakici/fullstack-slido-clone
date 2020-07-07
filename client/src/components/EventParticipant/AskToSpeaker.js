import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import NameArea from './NameArea';
import {sendQuestion} from '../../api/question';

function AskToSpeaker({eventId}) {
  const [question, setQuestion] = useState('');
  const [isAnon, setIsAnon] = useState(false);
  const participant = useSelector((state) => state.participantReducer);

  const handleSetIsAnon = () => setIsAnon(!isAnon);

  const handleSendQuestion = () => {
    sendQuestion({participantId: participant._id, eventId, question, isAnon});
  };

  return (
    <div>
      <p>Ask to speaker</p>
      <textarea
        value={question}
        onChange={({target: {value}}) => setQuestion(value)}
        cols="30"
        rows="10"
      ></textarea>
      <br />
      <NameArea eventId={eventId} anonFunc={handleSetIsAnon} isAnon={isAnon} />
      <br />
      <button onClick={handleSendQuestion}>send</button>
    </div>
  );
}

export default AskToSpeaker;
