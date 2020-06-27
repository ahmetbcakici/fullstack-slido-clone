import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getQuestions} from '../../api/event'

function Questions(/* {
  match: {
    params: {code},
  },
} */) {
  useEffect(() => {
    /* getQuestions(); */
  }, [])

  return (
    <div>
      <p>popular</p>
      <p>recent</p>
      <div>anon 4.39 pm 0 like 'selam naber'</div>
      <div>... sil düzenle</div>
    </div>
  );
}

export default Questions;
