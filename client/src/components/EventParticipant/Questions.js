import React, {useEffect, useState, Fragment} from 'react';
import {useSelector} from 'react-redux';

import {socket} from '../../config';
import {compareValues} from '../../utils';

import {
  getQuestions,
  deleteQuestion,
  editQuestion,
  likeQuestion,
} from '../../api/question';

function Questions({event}) {
  const [questionEdit, setQuestionEdit] = useState('');
  const [questions, setQuestions] = useState('');
  const [questionEditing, setQuestionEditing] = useState(false);
  const [isPopularSelected, setIsPopularSelected] = useState(true);
  const participant = useSelector((state) => state.participantReducer);
  const {_id: eventId} = event;

  useEffect(() => {
    if (event) {
      handleGetQuestions();

      socket.on('set-questions', () => {
        console.log('socket on participant questions.js');
        handleGetQuestions();
      });
    }
  }, [event]);

  useEffect(() => {
    if (questions) sortQuestions(questions);
    console.log(isPopularSelected);
  }, [isPopularSelected]);

  const sortQuestions = (questionsToSort) => {
    console.log(isPopularSelected);
    if (isPopularSelected === true) {
      const questionsSortedByPopularity = [...questionsToSort].sort(
        compareValues('likeCount', 'desc')
      );
      setQuestions(questionsSortedByPopularity);
      return;
    }

    const questionsSortedByRecent = [...questionsToSort].sort(
      compareValues('generatedAt', 'desc')
    );
    setQuestions(questionsSortedByRecent);
  };

  const handleGetQuestions = async () => {
    try {
      const {data} = await getQuestions({eventId});
      sortQuestions(data);
      /* setQuestions(data); */
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteQuestion = async (e) => {
    const questionId = e.target.parentElement.id;
    deleteQuestion({eventId, participantId: participant._id, questionId});
  };

  const handleEditQuestion = (e) => {
    const questionId = e.target.parentElement.parentElement.id;
    editQuestion({eventId, questionId, question: questionEdit});
    setQuestionEditing(false);
  };

  const handleLikeQuestion = (e) => {
    const questionId = e.target.parentElement.id;
    likeQuestion({eventId, questionId, participantId: participant._id});
  };

  const renderQuestions = () => {
    if (questions) {
      return questions.map(
        ({
          _id,
          question,
          generatedAt,
          isAnon,
          isHighlighted,
          ownerParticipantId,
          likeCount,
        }) => {
          let isQuestionOwner = false;
          if (ownerParticipantId._id === participant._id)
            isQuestionOwner = true;
          return (
            <div
              key={_id}
              id={_id}
              style={{background: isHighlighted && 'tomato'}}
            >
              <b>{isAnon ? 'Anon' : ownerParticipantId.name}: </b>
              {question} <small>{generatedAt}</small>
              <br />
              {isQuestionOwner && (
                <span
                  style={{color: 'red'}}
                  onClick={() => setQuestionEditing(_id)}
                >
                  edit
                </span>
              )}
              |{' '}
              {isQuestionOwner && (
                <span style={{color: 'blue'}} onClick={handleDeleteQuestion}>
                  delete
                </span>
              )}
              |{' '}
              <span style={{color: 'green'}} onClick={handleLikeQuestion}>
                like {likeCount}
              </span>
              <div style={{display: _id != questionEditing && 'none'}}>
                <input
                  type="text"
                  value={questionEdit}
                  onChange={({target: {value}}) => setQuestionEdit(value)}
                />
                <button onClick={handleEditQuestion}>OK</button>
              </div>
            </div>
          );
        }
      );
    }
  };

  return (
    <Fragment>
      <p onClick={() => setIsPopularSelected(true)}>popular</p>
      <p onClick={() => setIsPopularSelected(false)}>recent</p>
      <p>total {questions.length} questions</p>
      {renderQuestions()}
    </Fragment>
  );
}

export default Questions;
