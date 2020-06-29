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
import {generateQuestioner} from '../api/questioner';

function Event({
  match: {
    params: {code},
  },
}) {
  const [eventId, setEventId] = useState('');
  const [questioner, setQuestioner] = useState('');
  const history = useHistory();

  useEffect(() => {
    findEventIdByCode();
    questionerChecker();
  }, []);

  const findEventIdByCode = async () => {
    try {
      const eventId = await getEventId({eventCode: code});
      setEventId(eventId);
      return;
    } catch (error) {
      history.push('/404');
    }
  };

  /* todo put this function to generaller place to check */
  /* todo do not check just localstorage, also cheCk id validation from db */
  const questionerChecker = async () => {
    const questioner = localStorage.getItem('questioner');
    if (questioner) {
      setQuestioner(JSON.parse(questioner));
      return;
    }

    try {
      const {data} = await generateQuestioner();
      localStorage.setItem('questioner', JSON.stringify(data));
      setQuestioner(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Navbar eventId={eventId} questioner={questioner} />
      {/* <Sidebar/> */}
      <AskToSpeaker eventId={eventId} questioner={questioner} />
      <Questions eventId={eventId} questioner={questioner} />
    </Fragment>
  );
}

export default Event;
