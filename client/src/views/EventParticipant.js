import React, {Fragment} from 'react';

import {
  AskToSpeaker,
  Navbar,
  Polls,
  Questions,
  Sidebar,
} from '../components/EventParticipant';

function Event() {
  return <Fragment>
      <Navbar/>
      {/* <Sidebar/> */}
      <AskToSpeaker/>
      <Questions/>

  </Fragment>;
}

export default Event;
