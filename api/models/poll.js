import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const optionsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  option: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  selectCount: {
    type: Number,
    default: 0,
  },
  participantsSelected: [
    String,
    /* {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Participant',
    }, */
  ],
});
const answersSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  answer: String,
  ownerParticipantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
  },
});

const pollSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [optionsSchema],
  type: {
    type: String,
    enum: ['Multiple Choice', 'Open Text', 'Word Cloud', 'Rating', 'Quiz'],
    default: 'MULTIPLE-CHOICE',
  },
  answers: [answersSchema],
});

const Poll = model('Poll', pollSchema);
export default Poll;
