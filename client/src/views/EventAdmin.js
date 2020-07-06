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
  const [isQuestionsSelected, setIsQuestionsSelected] = useState(false);
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
      {isQuestionsSelected ? (
        <Fragment>
          <Questions eventId={eventId} />
          <LatestQuestion eventId={eventId} />
        </Fragment>
      ) : (
        <Stick eventId={eventId} />
      )}
    </Fragment>
  );
}

export default EventAdmin;
