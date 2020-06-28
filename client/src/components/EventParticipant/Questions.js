import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getQuestions} from '../../api/event';

function Questions({eventId}) {
  const [questions, setQuestions] = useState('');

  useEffect(() => {
    /* if (eventId) {
      getQuestions({eventId})
        .then((res) => setQuestions(res.data))
        .catch((err) => console.log(err));
    } */
    (async function () {
      if (eventId) {
        try {
          const {data} = await getQuestions({eventId});
          setQuestions(data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [eventId]);

  return (
    <div>
      <p>popular</p>
      <p>recent</p>
      {/* todo 2x data fetching */}
      {questions &&
        questions.map(({_id, question, generatedAt, ownerQuestionerId}) => (
          <p key={_id}>
            <b>{ownerQuestionerId.name}: </b>
            {question} <small>{generatedAt}</small>
          </p>
        ))}
      <div>... sil düzenle</div>
    </div>
  );
}

export default Questions;
