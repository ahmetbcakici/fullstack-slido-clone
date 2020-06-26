import mongoose from 'mongoose';
const {Schema, model} = mongoose;

import questionSchema from './questions';

const questionerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  questions: [questionSchema],
});

const Questioner = model('Questioner', questionerSchema);
export default Questioner;
