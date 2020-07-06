import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import {modalStyles} from '../../config';
import {generatePoll} from '../../api/poll';

Modal.setAppElement('#root');
function NewPoll({eventId}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const pollOptions = [
    'Multiple Choice',
    'Open Text',
    'Word Cloud',
    'Rating',
    'Quiz',
  ];

  const onOptionsChanged = (e) => {
    let tempOptions = [...options];
    tempOptions[e.target.id] = e.target.value;
    setOptions(tempOptions);
  };

  const handleGeneratePoll = (e) => {
    e.preventDefault();
    generatePoll({eventId, question, options,type: selectedForm});
  };

  const multipleChoiceForm = () => (
    <form onSubmit={handleGeneratePoll}>
      <input
        type="text"
        placeholder="question"
        value={question}
        onChange={({target: {value}}) => setQuestion(value)}
      />

      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder="add option"
              id={index}
              value={option}
              onChange={onOptionsChanged}
            />
          </li>
        ))}
      </ul>
      <input type="submit" value="START" />
    </form>
  );

  const openTextForm = () => (
    <form onSubmit={handleGeneratePoll}>
      <input
        type="text"
        placeholder="question"
        value={question}
        onChange={({target: {value}}) => setQuestion(value)}
      />
      <input type="submit" value="START" />
    </form>
  );

  const wordCloudForm = () => (
    <form onSubmit={handleGeneratePoll}>
      <input
        type="text"
        placeholder="question"
        value={question}
        onChange={({target: {value}}) => setQuestion(value)}
      />
      <input type="submit" value="START" />
    </form>
  );

  const ratingForm = () => (
    <form onSubmit={handleGeneratePoll}>
      <input
        type="text"
        placeholder="question"
        value={question}
        onChange={({target: {value}}) => setQuestion(value)}
      />
      <input type="submit" value="START" />
    </form>
  );

  const quizForm = () => (
    <form onSubmit={handleGeneratePoll}>
      <input
        type="text"
        placeholder="question"
        value={question}
        onChange={({target: {value}}) => setQuestion(value)}
      />
      <ul>
        <li>
          <input type="radio" name="correct" />
          <input type="text" placeholder="add option" />
        </li>
        <li>
          <input type="radio" name="correct" />
          <input type="text" placeholder="add option" />
        </li>
        <li>
          <input type="radio" name="correct" />
          <input type="text" placeholder="add option" />
        </li>
      </ul>
      <input type="submit" value="START" />
    </form>
  );

  const renderForm = () => {
    switch (selectedForm) {
      case 'Multiple Choice':
        return multipleChoiceForm();
      case 'Open Text':
        return openTextForm();
      case 'Word Cloud':
        return wordCloudForm();
      case 'Rating':
        return ratingForm();
      case 'Quiz':
        return quizForm();
      default:
        return multipleChoiceForm();
    }
  };

  return (
    <Fragment>
      <p>
        <b>generate new poll</b>
      </p>
      <ul>
        {pollOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              setIsModalOpen(true);
              setSelectedForm(option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
      >
        <Dropdown
          options={pollOptions}
          value={selectedForm}
          placeholder="Select an option"
          onChange={({value}) => setSelectedForm(value)}
        />
        {renderForm()}
      </Modal>
    </Fragment>
  );
}

export default NewPoll;
