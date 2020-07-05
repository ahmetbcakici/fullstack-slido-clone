import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import {modalStyles} from '../../config';

Modal.setAppElement('#root');
function NewPoll() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState('');
  const pollOptions = [
    'Multiple Choice',
    'Open Text',
    'Word Cloud',
    'Rating',
    'Quiz',
  ];

  const multipleChoiceForm = () => (
    <form>
      <input type="text" placeholder="question" />
      <ul>
        <li>
          <input type="text" placeholder="add option" />
        </li>
        <li>
          <input type="text" placeholder="add option" />
        </li>
        <li>
          <input type="text" placeholder="add option" />
        </li>
      </ul>
      <input type="submit" value="START" />
    </form>
  );

  const openTextForm = () => (
    <form>
      <input type="text" placeholder="question" />
      <input type="submit" value="START" />
    </form>
  );

  const wordCloudForm = () => (
    <form>
      <input type="text" placeholder="question" />
      <input type="submit" value="START" />
    </form>
  );

  const ratingForm = () => (
    <form>
      <input type="text" placeholder="question" />
      <input type="submit" value="START" />
    </form>
  );

  const quizForm = () => (
    <form>
      <input type="text" placeholder="question" />
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
