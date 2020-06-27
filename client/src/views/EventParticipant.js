import React, {Fragment, useEffect, useState} from 'react';

import {
  AskToSpeaker,
  Navbar,
  Polls,
  Questions,
  Sidebar,
} from '../components/EventParticipant';

import {getEventId} from '../api/event';

function Event({
  match: {
    params: {code},
  },
}) {
  const [eventId, setEventId] = useState('');

  useEffect(() => {
    findEventIdByCode();
  }, []);

  const findEventIdByCode = async () => {
    const eventId = await getEventId({eventCode: code});
    if (eventId) {
      setEventId(eventId);
      return;
    }

    //todo event could not found so redirect to 404
  };

  return (
    <Fragment>
      <Navbar eventId={eventId} />
      {/* <Sidebar/> */}
      <AskToSpeaker eventId={eventId} />
      <Questions eventId={eventId} />
    </Fragment>
  );
}

export default Event;
