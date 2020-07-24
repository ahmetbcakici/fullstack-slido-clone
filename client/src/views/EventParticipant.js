import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
  AskToSpeaker,
  Navbar,
  Polls,
  Questions,
  Sidebar,
} from '../components/EventParticipant';

import {getEvent} from '../api/event';
import {socket} from '../config';

function Event({
  match: {
    params: {code},
  },
}) {
  const [isQuestionsSelected, setIsQuestionsSelected] = useState(false);
  const [eventId, setEventId] = useState('');
  const [event, setEvent] = useState('');
  const history = useHistory();

  useEffect(() => {
    handleGetEvent();
  }, []);

  useEffect(() => {
    if (eventId) {
      socket.emit('joinEvent', eventId);

      socket.on('set-event', () => {
        console.log('socket on participant questions.js');
        handleGetEvent();
      });
    }
  }, [eventId]);

  const handleSetIsQuestionsSelected = (val) => setIsQuestionsSelected(val);

  const handleGetEvent = async () => {
    try {
      const event = await getEvent({eventCode: code});
      setEventId(event._id);
      setEvent(event);
    } catch (error) {
      history.push('/404');
    }
  };

  return (
    <Fragment>
      <Navbar
        event={event}
        handleSetIsQuestionsSelected={handleSetIsQuestionsSelected}
      />
      {/* Sidebar */}
      {isQuestionsSelected ? (
        event.disableQA ? (
          <h1>Disabled</h1>
        ) : (
          <Fragment>
            <AskToSpeaker eventId={eventId} />
            <Questions event={event} />
          </Fragment>
        )
      ) : (
        <Polls eventId={eventId} />
      )}
    </Fragment>
  );
}

export default Event;
