import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const participantSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    default: 'Anon',
  },
  email: String,
  joinedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  likedQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
});

const Participant = model('Participant', participantSchema);
export default Participant;
