import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
  LatestQuestion,
  Questions,
  Sidebar,
  Stick,
} from '../components/EventAdmin';

import {getEventId} from '../api/event';

function EventAdmin({
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
      <Sidebar />
      <Questions eventId={eventId} />
      <LatestQuestion eventId={eventId} />
      <Stick />
    </Fragment>
  );
}

export default EventAdmin;
