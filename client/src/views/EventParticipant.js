import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

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
  const history = useHistory();

  useEffect(() => {
    findEventIdByCode();
  }, []);

  const findEventIdByCode = async () => {
    try {
      const eventId = await getEventId({eventCode: code});
      setEventId(eventId);
      return;
    } catch (error) {
      history.push('/404');
    }

    //todo event could not found so redirect to 404
    console.log('lol');
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
