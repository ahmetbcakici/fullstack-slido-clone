import mongoose from 'mongoose';
const {Schema, model} = mongoose;

import questionSchema from './questions';

const questionerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    default: 'Anon',
  },
  email: String,
  joinedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  questions: [questionSchema],
});

const Questioner = model('Questioner', questionerSchema);
export default Questioner;
