import mongoose from 'mongoose';
const {Schema} = mongoose;

const questionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  question: String,
  generatedAt: {
    type:Date,
    default:Date.now,
  },
  likeCount: Number,
});

export default questionSchema;
