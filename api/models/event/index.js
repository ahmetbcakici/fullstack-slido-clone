import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const eventSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

const Event = model('Event', eventSchema);
export default Event;