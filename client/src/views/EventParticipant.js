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
import {socket} from '../config';

function Event({
  match: {
    params: {code},
  },
}) {
  const [isQuestionsSelected, setIsQuestionsSelected] = useState(false);
  const [eventId, setEventId] = useState('');
  const history = useHistory();

  useEffect(() => {
    findEventIdByCode();
  }, []);

  useEffect(() => {
    if (eventId) socket.emit('joinEvent', eventId);
  }, [eventId]);

  const handleSetIsQuestionsSelected = (val) => setIsQuestionsSelected(val);

  const findEventIdByCode = async () => {
    try {
      const eventId = await getEventId({eventCode: code});
      setEventId(eventId);
    } catch (error) {
      history.push('/404');
    }
  };

  return (
    <Fragment>
      <Navbar
        eventId={eventId}
        handleSetIsQuestionsSelected={handleSetIsQuestionsSelected}
      />
      {/* Sidebar */}
      {isQuestionsSelected ? (
        <Fragment>
          <AskToSpeaker eventId={eventId} />
          <Questions eventId={eventId} />
        </Fragment>
      ) : (
        <Polls eventId={eventId} />
      )}
    </Fragment>
  );
}

export default Event;
