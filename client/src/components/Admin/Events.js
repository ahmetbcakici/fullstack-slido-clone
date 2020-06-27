import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {generateEvent} from '../../api/event';

function Events() {
  const user = useSelector((state) => state.userReducer);

  const handleGenerateEvent = async () => {
    await generateEvent({userId: user._id}); //todo userid gonna be dynamic
  };

  return (
    <Fragment>
      <button onClick={handleGenerateEvent}>quick event</button>
      <button>schedule event</button>
    </Fragment>
  );
}

export default Events;
