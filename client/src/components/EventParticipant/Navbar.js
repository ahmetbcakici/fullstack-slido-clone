import React from 'react';

function EventParticipantNavbar({handleSetIsQuestionsSelected}) {
  return (
    <nav>
      <ul>
        <li>hamburger</li>
        <li>Meeting - 6/24/2020</li>
        <li onClick={() => handleSetIsQuestionsSelected(true)}>Q&A</li>
        <li onClick={() => handleSetIsQuestionsSelected(false)}>Polls</li>
        <li>user icon ve altında (edit my profile, my questions, log out)</li>
      </ul>
    </nav>
  );
}

export default EventParticipantNavbar;
