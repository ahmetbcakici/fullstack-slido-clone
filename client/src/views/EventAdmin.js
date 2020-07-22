import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
  LatestQuestion,
  Questions,
  Sidebar,
  Stick,
} from '../components/EventAdmin';

import {getEventId} from '../api/event';
import {PollResults} from '../components/EventAdmin';
import {socket} from '../config';

function EventAdmin({
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

  const handleSetIsQuestionsSelected = (val) => {
    if (val !== true && val !== false) {
      setIsQuestionsSelected(!isQuestionsSelected);
      return;
    }
    setIsQuestionsSelected(val);
  };

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
      <Sidebar />
      {isQuestionsSelected ? (
        <Fragment>
          <Questions eventId={eventId} />
          <LatestQuestion eventId={eventId} />
        </Fragment>
      ) : (
        <PollResults eventId={eventId} />
      )}
      <Stick
        eventId={eventId}
        eventCode={code}
        handleSetIsQuestionsSelected={handleSetIsQuestionsSelected}
      />
    </Fragment>
  );
}

export default EventAdmin;
