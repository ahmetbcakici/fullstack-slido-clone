import React, {useState, useEffect} from 'react';
import {sendQuestion} from '../../api/event';

function AskToSpeaker({eventId}) {
  const [question, setQuestion] = useState('');

  const handleSendQuestion = () => {
    const questionerId = localStorage.getItem('questionerId');/* todo: make questioner id usable */
    sendQuestion({questionerId, eventId, question});
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
      <input type="text" placeholder="your name (optional)" />
      <br />
      <button onClick={handleSendQuestion}>send</button>
    </div>
  );
}

export default AskToSpeaker;
