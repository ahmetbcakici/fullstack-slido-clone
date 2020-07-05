import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const questionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ownerQuestionerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Questioner'},
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  question: {
    type: String,
    required: true,
  },
  isAnon: {
    type: Boolean,
    default: false,
  },
  isHighlighted: {
    type: Boolean,
    default: false,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  questionersLiked: [String],
});

const Question = model('Question', questionSchema);
export default Question;
