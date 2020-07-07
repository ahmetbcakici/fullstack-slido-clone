import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const questionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ownerParticipantId: {type: mongoose.Schema.Types.ObjectId, ref: 'Participant'},
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
  participantsLiked: [String],
});

const Question = model('Question', questionSchema);
export default Question;
