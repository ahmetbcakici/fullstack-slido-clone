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
  const [isQuestionsSelected, setIsQuestionsSelected] = useState(true);
  const [eventId, setEventId] = useState('');
  const history = useHistory();

  useEffect(() => {
    findEventIdByCode();
  }, []);

  const handleSetIsQuestionsSelected = (val) =>
    setIsQuestionsSelected(val);

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
      <AskToSpeaker eventId={eventId} />
      {isQuestionsSelected ? (
        <Questions eventId={eventId} />
      ) : (
        <Polls eventId={eventId} />
      )}
    </Fragment>
  );
}

export default Event;
