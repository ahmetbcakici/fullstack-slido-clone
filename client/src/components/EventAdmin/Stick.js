import React from 'react';

import NewPoll from './NewPoll';
import PollList from './PollList';

function Stick({eventId,handleSetIsQuestionsSelected}) {
  return (
    <div>
      <NewPoll eventId={eventId} />
      <PollList eventId={eventId} />

      <button>lock voting</button>
      <button>hide results</button>
      <br />
      <button onClick={handleSetIsQuestionsSelected}>show Q&A (or polls)</button>

      <p>
        <b>settings</b>
      </p>
      <ul>
        <li>copy event link</li>
        <li>disable participant Q&A</li>
      </ul>

      <br />
      <button>full screen</button>
    </div>
  );
}

export default Stick;
