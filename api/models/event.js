import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const eventSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  ownerUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  disableQA: {
    type: Boolean,
    default: false,
  },
  code: String,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  polls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}],
});

const Event = model('Event', eventSchema);
export default Event;
