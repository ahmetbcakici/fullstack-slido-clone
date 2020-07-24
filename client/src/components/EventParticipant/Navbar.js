import React from 'react';

import {isoToNormal} from '../../utils';

function EventParticipantNavbar({event, handleSetIsQuestionsSelected}) {
  const {generatedAt, code} = event;
  return (
    <nav>
      <ul>
        <li>#{code}</li>
        <li>Meeting - {isoToNormal(generatedAt)}</li>
        <li onClick={() => handleSetIsQuestionsSelected(true)}>Q&A</li>
        <li onClick={() => handleSetIsQuestionsSelected(false)}>Polls</li>
      </ul>
    </nav>
  );
}

export default EventParticipantNavbar;
