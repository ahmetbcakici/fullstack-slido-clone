import React, {useState, useEffect} from 'react';

import NameArea from './NameArea';
import {sendQuestion} from '../../api/question';

function AskToSpeaker({eventId, questioner}) {
  const [question, setQuestion] = useState('');
  /* const [name, setName] = useState(questioner.name); */
  const [isAnon, setIsAnon] = useState(false);

  const handleSetIsAnon = () => setIsAnon(!isAnon);

  const handleSendQuestion = () => {
    sendQuestion({questionerId: questioner._id, eventId, question, isAnon});
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
      <NameArea
        questioner={questioner}
        anonFunc={handleSetIsAnon}
        isAnon={isAnon}
      />
      <br />
      <button onClick={handleSendQuestion}>send</button>
    </div>
  );
}

export default AskToSpeaker;
