import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const questionerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    default: 'Anon',
  },
  email: String,
  joinedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
});

const Questioner = model('Questioner', questionerSchema);
export default Questioner;
