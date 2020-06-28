import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const eventSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:String,
  ownerUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  code: String,
  questions:[{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
});

const Event = model('Event', eventSchema);
export default Event;
